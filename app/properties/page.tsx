'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Grid3X3, List, Map, SlidersHorizontal, X } from 'lucide-react'
import { properties as allProperties } from '@/data/properties'
import { filterProperties, sortProperties } from '@/lib/utils'
import { usePropertyStore } from '@/store/usePropertyStore'
import PropertyGrid from '@/components/property/PropertyGrid'
import FilterPanel from '@/components/search/FilterPanel'
import PropertyMap from '@/components/map/PropertyMap'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

function PropertiesContent() {
  const searchParams = useSearchParams()
  const { filters, setFilters, viewMode, setViewMode } = usePropertyStore()
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  // Sync URL params to filters
  useEffect(() => {
    const listingType = searchParams.get('listingType')
    const type = searchParams.get('type')
    const city = searchParams.get('city')
    const query = searchParams.get('q')

    const updates: Record<string, string> = {}
    if (listingType) updates.listingType = listingType
    if (type) updates.propertyType = type
    if (city) updates.query = city
    if (query) updates.query = query

    if (Object.keys(updates).length > 0) {
      setFilters(updates as Parameters<typeof setFilters>[0])
    }
  }, [searchParams, setFilters])

  const filtered = filterProperties(allProperties, filters)
  const sorted = sortProperties(filtered, filters.sortBy)

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {filters.listingType === 'sale' ? 'Homes for Sale' :
             filters.listingType === 'rent' ? 'Homes for Rent' :
             filters.listingType === 'short-term' ? 'Short-Term Rentals' :
             'All Properties'}
          </h1>
          <p className="text-gray-500 text-sm mt-1">{sorted.length} properties found</p>
        </div>

        {/* Top Bar */}
        <div className="flex items-center justify-between gap-4 mb-6 bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2">
            {/* Mobile filter button */}
            <button
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
            <span className="text-sm text-gray-500 hidden sm:block">
              <span className="font-semibold text-gray-800">{sorted.length}</span> properties
            </span>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              title="Grid view"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              title="List view"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'map' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              title="Map view"
            >
              <Map className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filter - Desktop */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24">
              <FilterPanel />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {viewMode === 'map' ? (
              <PropertyMap properties={sorted} />
            ) : (
              <PropertyGrid properties={sorted} viewMode={viewMode === 'list' ? 'list' : 'grid'} />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setShowMobileFilters(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-white z-50 overflow-y-auto"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">Filters</h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="p-4">
                <FilterPanel onApply={() => setShowMobileFilters(false)} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center"><LoadingSpinner size="lg" /></div>}>
      <PropertiesContent />
    </Suspense>
  )
}
