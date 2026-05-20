'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Heart, Bed, Bath, Square, MapPin, Eye } from 'lucide-react'
import { motion } from 'framer-motion'
import { Property } from '@/types'
import { formatPrice, formatNumber, getPropertyTypeLabel, truncateText } from '@/lib/utils'
import { usePropertyStore } from '@/store/usePropertyStore'
import Badge from '@/components/ui/Badge'
import { agents } from '@/data/agents'
import toast from 'react-hot-toast'

interface PropertyCardProps {
  property: Property
  viewMode?: 'grid' | 'list'
}

export default function PropertyCard({ property, viewMode = 'grid' }: PropertyCardProps) {
  const [imgError, setImgError] = useState(false)
  const { toggleFavorite, isFavorite } = usePropertyStore()
  const favorite = isFavorite(property.id)
  const agent = agents.find((a) => a.id === property.agentId)

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(property.id)
    toast(favorite ? 'Removed from saved' : 'Saved to favorites', {
      icon: favorite ? '💔' : '❤️',
    })
  }

  const listingBadgeVariant =
    property.listingType === 'sale' ? 'sale' : property.listingType === 'rent' ? 'rent' : 'short-term'
  const listingLabel =
    property.listingType === 'sale' ? 'FOR SALE' : property.listingType === 'rent' ? 'FOR RENT' : 'SHORT-TERM'

  if (viewMode === 'list') {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="property-card bg-white rounded-2xl border border-gray-100 overflow-hidden flex"
      >
        <Link href={`/properties/${property.id}`} className="flex w-full">
          {/* Image */}
          <div className="relative w-64 flex-shrink-0">
            <Image
              src={imgError ? '/placeholder-property.jpg' : property.images[0]}
              alt={property.title}
              fill
              className="object-cover"
              onError={() => setImgError(true)}
            />
            <div className="absolute top-3 left-3 flex gap-1.5">
              <Badge variant={listingBadgeVariant}>{listingLabel}</Badge>
              {property.isNew && <Badge variant="new">NEW</Badge>}
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-between p-5 flex-1 min-w-0">
            <div>
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="text-base font-semibold text-gray-900 truncate">{property.title}</h3>
                <button
                  onClick={handleFavorite}
                  className="flex-shrink-0 p-1.5 rounded-full hover:bg-red-50 transition-colors"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${favorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                  />
                </button>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                <MapPin className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{property.address.street}, {property.address.city}, {property.address.state}</span>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">{property.description}</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                {property.specs.bedrooms > 0 && (
                  <span className="flex items-center gap-1">
                    <Bed className="w-4 h-4 text-blue-500" />
                    {property.specs.bedrooms} bd
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Bath className="w-4 h-4 text-blue-500" />
                  {property.specs.bathrooms} ba
                </span>
                <span className="flex items-center gap-1">
                  <Square className="w-4 h-4 text-blue-500" />
                  {formatNumber(property.specs.sqft)} sqft
                </span>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-blue-600">
                  {formatPrice(property.price, property.listingType)}
                </p>
                {property.pricePerSqft && (
                  <p className="text-xs text-gray-400">${property.pricePerSqft}/sqft</p>
                )}
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="property-card bg-white rounded-2xl border border-gray-100 overflow-hidden group"
    >
      <Link href={`/properties/${property.id}`}>
        {/* Image Container */}
        <div className="relative h-52 overflow-hidden">
          <Image
            src={imgError ? 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&auto=format' : property.images[0]}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

          {/* Top badges */}
          <div className="absolute top-3 left-3 flex gap-1.5">
            <Badge variant={listingBadgeVariant}>{listingLabel}</Badge>
            {property.isFeatured && <Badge variant="featured">FEATURED</Badge>}
            {property.isNew && <Badge variant="new">NEW</Badge>}
          </div>

          {/* Favorite button */}
          <button
            onClick={handleFavorite}
            className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${favorite ? 'fill-red-500 text-red-500' : 'text-gray-500'}`}
            />
          </button>

          {/* Views count */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/40 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
            <Eye className="w-3 h-3" />
            <span>{formatNumber(property.views)}</span>
          </div>

          {/* New ribbon */}
          {property.isNew && (
            <div className="absolute top-0 left-0 w-16 h-16 overflow-hidden">
              <div className="absolute -top-1 -left-1 w-20 h-5 bg-green-500 rotate-[-45deg] translate-y-3 text-white text-[9px] font-bold flex items-center justify-center">
                NEW
              </div>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-4">
          {/* Price */}
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-xl font-bold text-gray-900">
                {formatPrice(property.price, property.listingType)}
              </p>
              {property.pricePerSqft && (
                <p className="text-xs text-gray-400">${property.pricePerSqft}/sqft</p>
              )}
            </div>
            <Badge variant="muted" className="text-xs">
              {getPropertyTypeLabel(property.type)}
            </Badge>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1.5 line-clamp-1">
            {property.title}
          </h3>

          {/* Address */}
          <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
            <MapPin className="w-3 h-3 flex-shrink-0 text-blue-500" />
            <span className="truncate">
              {property.address.city}, {property.address.state}
            </span>
          </div>

          {/* Specs */}
          <div className="flex items-center gap-3 text-xs text-gray-600 pb-3 border-b border-gray-100">
            {property.specs.bedrooms > 0 && (
              <span className="flex items-center gap-1">
                <Bed className="w-3.5 h-3.5 text-blue-500" />
                <span className="font-medium">{property.specs.bedrooms}</span>
                <span className="text-gray-400">bd</span>
              </span>
            )}
            <span className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5 text-blue-500" />
              <span className="font-medium">{property.specs.bathrooms}</span>
              <span className="text-gray-400">ba</span>
            </span>
            <span className="flex items-center gap-1">
              <Square className="w-3.5 h-3.5 text-blue-500" />
              <span className="font-medium">{formatNumber(property.specs.sqft)}</span>
              <span className="text-gray-400">sqft</span>
            </span>
          </div>

          {/* Agent */}
          {agent && (
            <div className="pt-3 flex items-center gap-2">
              <div className="relative w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={agent.photo}
                  alt={agent.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-xs text-gray-500 truncate">{agent.name}</span>
              <span className="ml-auto text-xs text-gray-400">{agent.agency}</span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
