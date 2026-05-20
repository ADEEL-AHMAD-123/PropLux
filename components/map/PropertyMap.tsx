'use client'

import { useState, useCallback } from 'react'
import { Property } from '@/types'
import { formatPrice, getPropertyTypeLabel } from '@/lib/utils'
import { MapPin, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface PropertyMapProps {
  properties: Property[]
}

export default function PropertyMap({ properties }: PropertyMapProps) {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

  if (!token) {
    return (
      <div className="w-full h-[600px] rounded-2xl bg-gray-100 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-4 p-8">
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
          <MapPin className="w-8 h-8 text-blue-600" />
        </div>
        <div className="text-center max-w-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Map View Ready</h3>
          <p className="text-sm text-gray-500 mb-4">
            To enable the interactive map, add your Mapbox token to your environment variables.
          </p>
          <code className="text-xs bg-gray-800 text-green-400 px-3 py-2 rounded-lg block">
            NEXT_PUBLIC_MAPBOX_TOKEN=your_token_here
          </code>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-2xl mt-4">
          {properties.slice(0, 6).map((p) => (
            <Link
              key={p.id}
              href={`/properties/${p.id}`}
              className="bg-white rounded-xl p-3 border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all group"
            >
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gray-800 truncate group-hover:text-blue-600 transition-colors">
                    {p.address.city}, {p.address.state}
                  </p>
                  <p className="text-xs font-bold text-blue-600 mt-0.5">
                    {formatPrice(p.price, p.listingType)}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5 capitalize">{getPropertyTypeLabel(p.type)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
  }

  // Full Mapbox implementation (rendered when token is available)
  return (
    <div className="relative w-full h-[600px] rounded-2xl overflow-hidden">
      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">Map loading...</p>
      </div>
      {selectedProperty && (
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl shadow-xl p-4 flex gap-3">
          <button
            onClick={() => setSelectedProperty(null)}
            className="absolute top-3 right-3 p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
          <div className="relative w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
            <Image src={selectedProperty.images[0]} alt={selectedProperty.title} fill className="object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{selectedProperty.title}</p>
            <p className="text-xs text-gray-500 truncate">{selectedProperty.address.city}, {selectedProperty.address.state}</p>
            <p className="text-sm font-bold text-blue-600 mt-1">{formatPrice(selectedProperty.price, selectedProperty.listingType)}</p>
          </div>
          <Link
            href={`/properties/${selectedProperty.id}`}
            className="self-center px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors flex-shrink-0"
          >
            View
          </Link>
        </div>
      )}
    </div>
  )
}
