'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin, ChevronDown, SlidersHorizontal } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePropertyStore } from '@/store/usePropertyStore'

const listingTabs = [
  { label: 'Buy', value: 'sale' },
  { label: 'Rent', value: 'rent' },
  { label: 'Short-Term', value: 'short-term' },
]

const propertyTypes = [
  { label: 'Any Type', value: 'all' },
  { label: 'House', value: 'house' },
  { label: 'Apartment', value: 'apartment' },
  { label: 'Condo', value: 'condo' },
  { label: 'Townhouse', value: 'townhouse' },
  { label: 'Villa', value: 'villa' },
  { label: 'Studio', value: 'studio' },
  { label: 'Office', value: 'office' },
]

const bedroomsOptions = ['Any', '1+', '2+', '3+', '4+', '5+']

export default function HeroSearch() {
  const router = useRouter()
  const { setFilters } = usePropertyStore()
  const [activeTab, setActiveTab] = useState('sale')
  const [location, setLocation] = useState('')
  const [propertyType, setPropertyType] = useState('all')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [bedrooms, setBedrooms] = useState('Any')
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleSearch = () => {
    setFilters({
      listingType: activeTab as 'sale' | 'rent' | 'short-term',
      propertyType: propertyType as 'all',
      query: location,
      minPrice: minPrice ? parseInt(minPrice) : 0,
      maxPrice: maxPrice ? parseInt(maxPrice) : 10000000,
      bedrooms: bedrooms === 'Any' ? 'any' : bedrooms.replace('+', ''),
    })
    router.push('/properties')
  }

  return (
    <div className="glass rounded-2xl p-2 shadow-2xl w-full max-w-4xl mx-auto">
      {/* Tabs */}
      <div className="flex gap-1 mb-3 p-1 bg-gray-100/80 rounded-xl">
        {listingTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-200
              ${activeTab === tab.value
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search Row */}
      <div className="flex flex-col sm:flex-row gap-2">
        {/* Location Input */}
        <div className="flex-1 flex items-center gap-2 bg-white rounded-xl px-4 py-3 border border-gray-200 focus-within:border-blue-500 transition-colors">
          <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
          <input
            type="text"
            placeholder="City, neighborhood, or ZIP code..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1 text-sm bg-transparent outline-none text-gray-800 placeholder-gray-400"
          />
        </div>

        {/* Property Type */}
        <div className="relative">
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-8 text-sm text-gray-700 outline-none focus:border-blue-500 transition-colors cursor-pointer"
          >
            {propertyTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm shadow-blue-300"
        >
          <Search className="w-4 h-4" />
          Search
        </button>
      </div>

      {/* Advanced Filters Toggle */}
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="flex items-center gap-1.5 mt-2 ml-1 text-xs text-gray-500 hover:text-blue-600 transition-colors"
      >
        <SlidersHorizontal className="w-3.5 h-3.5" />
        Advanced Filters
        <ChevronDown className={`w-3 h-3 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
      </button>

      {/* Advanced Filters */}
      <AnimatePresence>
        {showAdvanced && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 pt-3 border-t border-gray-100">
              <div>
                <label className="text-xs text-gray-500 mb-1 block font-medium">Min Price</label>
                <input
                  type="number"
                  placeholder="$0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block font-medium">Max Price</label>
                <input
                  type="number"
                  placeholder="Any"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block font-medium">Bedrooms</label>
                <div className="flex gap-1">
                  {bedroomsOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setBedrooms(opt)}
                      className={`flex-1 py-2 text-xs rounded-lg border transition-colors
                        ${bedrooms === opt
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400'
                        }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
