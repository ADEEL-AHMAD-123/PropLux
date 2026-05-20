'use client'

import { useState } from 'react'
import { SlidersHorizontal, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react'
import { usePropertyStore } from '@/store/usePropertyStore'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const PROPERTY_TYPES = ['house', 'apartment', 'condo', 'townhouse', 'villa', 'studio', 'office', 'land', 'vacation']
const AMENITY_OPTIONS = [
  'Pool', 'Gym', 'Parking', 'Balcony', 'Rooftop', 'Concierge', 'Doorman',
  'Pet Friendly', 'AC', 'Washer/Dryer', 'Dishwasher', 'Fireplace',
  'Hardwood Floors', 'Walk-in Closet', 'Smart Home', 'EV Charging',
]
const BED_BATH_OPTIONS = ['any', '1', '2', '3', '4', '5']
const SORT_OPTIONS = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Oldest First', value: 'oldest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Largest First', value: 'sqft-desc' },
  { label: 'Featured', value: 'featured' },
]

function Section({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-gray-100 pb-4 mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-sm font-semibold text-gray-800 mb-3"
      >
        {title}
        {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>
      {open && children}
    </div>
  )
}

export default function FilterPanel({ onApply }: { onApply?: () => void }) {
  const { filters, setFilters, resetFilters } = usePropertyStore()

  const activeFilterCount = [
    filters.listingType !== 'all',
    filters.propertyType !== 'all',
    filters.minPrice > 0,
    filters.maxPrice < 10000000,
    filters.bedrooms !== 'any',
    filters.bathrooms !== 'any',
    filters.minSqft > 0,
    filters.maxSqft < 20000,
    filters.amenities.length > 0,
    filters.city !== '',
    filters.state !== '',
  ].filter(Boolean).length

  const toggleAmenity = (amenity: string) => {
    const updated = filters.amenities.includes(amenity)
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity]
    setFilters({ amenities: updated })
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-blue-600" />
          <span className="font-semibold text-gray-900">Filters</span>
          {activeFilterCount > 0 && (
            <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full font-medium">
              {activeFilterCount}
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={() => { resetFilters(); onApply?.() }}
            className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>

      {/* Sort By */}
      <Section title="Sort By">
        <select
          value={filters.sortBy}
          onChange={(e) => setFilters({ sortBy: e.target.value })}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-500"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </Section>

      {/* Listing Type */}
      <Section title="Listing Type">
        <div className="flex gap-2 flex-wrap">
          {[{ label: 'All', value: 'all' }, { label: 'For Sale', value: 'sale' }, { label: 'For Rent', value: 'rent' }, { label: 'Short-Term', value: 'short-term' }].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilters({ listingType: opt.value as 'all' | 'sale' | 'rent' | 'short-term' })}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors',
                filters.listingType === opt.value
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </Section>

      {/* Price Range */}
      <Section title="Price Range">
        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice || ''}
            onChange={(e) => setFilters({ minPrice: Number(e.target.value) })}
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
          />
          <span className="text-gray-400 text-sm">–</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice >= 10000000 ? '' : filters.maxPrice}
            onChange={(e) => setFilters({ maxPrice: e.target.value ? Number(e.target.value) : 10000000 })}
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex gap-2 flex-wrap mt-2">
          {[
            { label: 'Under $500K', min: 0, max: 500000 },
            { label: '$500K–$1M', min: 500000, max: 1000000 },
            { label: '$1M–$3M', min: 1000000, max: 3000000 },
            { label: '$3M+', min: 3000000, max: 10000000 },
          ].map((range) => (
            <button
              key={range.label}
              onClick={() => setFilters({ minPrice: range.min, maxPrice: range.max })}
              className="px-2.5 py-1 text-xs border border-gray-200 rounded-lg hover:border-blue-400 hover:text-blue-600 transition-colors"
            >
              {range.label}
            </button>
          ))}
        </div>
      </Section>

      {/* Property Type */}
      <Section title="Property Type">
        <div className="grid grid-cols-2 gap-1.5">
          {PROPERTY_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setFilters({ propertyType: filters.propertyType === type ? 'all' : type as 'house' })}
              className={cn(
                'px-3 py-2 rounded-lg text-xs font-medium border capitalize transition-colors',
                filters.propertyType === type
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400'
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </Section>

      {/* Bedrooms */}
      <Section title="Bedrooms">
        <div className="flex gap-1.5">
          {BED_BATH_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => setFilters({ bedrooms: opt })}
              className={cn(
                'flex-1 py-2 text-xs rounded-lg border font-medium transition-colors',
                filters.bedrooms === opt
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400'
              )}
            >
              {opt === 'any' ? 'Any' : `${opt}+`}
            </button>
          ))}
        </div>
      </Section>

      {/* Bathrooms */}
      <Section title="Bathrooms">
        <div className="flex gap-1.5">
          {BED_BATH_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => setFilters({ bathrooms: opt })}
              className={cn(
                'flex-1 py-2 text-xs rounded-lg border font-medium transition-colors',
                filters.bathrooms === opt
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400'
              )}
            >
              {opt === 'any' ? 'Any' : `${opt}+`}
            </button>
          ))}
        </div>
      </Section>

      {/* Size Range */}
      <Section title="Size (sqft)" defaultOpen={false}>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="Min sqft"
            value={filters.minSqft || ''}
            onChange={(e) => setFilters({ minSqft: Number(e.target.value) })}
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
          />
          <span className="text-gray-400 text-sm">–</span>
          <input
            type="number"
            placeholder="Max sqft"
            value={filters.maxSqft >= 20000 ? '' : filters.maxSqft}
            onChange={(e) => setFilters({ maxSqft: e.target.value ? Number(e.target.value) : 20000 })}
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
          />
        </div>
      </Section>

      {/* Amenities */}
      <Section title="Amenities" defaultOpen={false}>
        <div className="flex flex-wrap gap-1.5">
          {AMENITY_OPTIONS.map((amenity) => (
            <button
              key={amenity}
              onClick={() => toggleAmenity(amenity)}
              className={cn(
                'px-2.5 py-1 text-xs rounded-full border transition-colors',
                filters.amenities.includes(amenity)
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400'
              )}
            >
              {amenity}
            </button>
          ))}
        </div>
      </Section>

      {/* Location */}
      <Section title="Location" defaultOpen={false}>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="City"
            value={filters.city}
            onChange={(e) => setFilters({ city: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
          />
          <input
            type="text"
            placeholder="State (e.g. FL, NY)"
            value={filters.state}
            onChange={(e) => setFilters({ state: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
          />
        </div>
      </Section>

      {/* Apply */}
      <Button
        variant="primary"
        className="w-full"
        onClick={onApply}
      >
        Apply Filters
        {activeFilterCount > 0 && (
          <span className="ml-1 bg-white/20 text-white text-xs px-1.5 py-0.5 rounded-full">
            {activeFilterCount}
          </span>
        )}
      </Button>
    </div>
  )
}
