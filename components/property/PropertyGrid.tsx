'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PropertyCard from './PropertyCard'
import EmptyState from '@/components/ui/EmptyState'
import { Property } from '@/types'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const PAGE_SIZE = 12

interface PropertyGridProps {
  properties: Property[]
  viewMode: 'grid' | 'list'
}

export default function PropertyGrid({ properties, viewMode }: PropertyGridProps) {
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(properties.length / PAGE_SIZE)
  const paginated = properties.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  if (properties.length === 0) {
    return (
      <EmptyState
        title="No properties found"
        description="Try adjusting your search filters or browse all available listings."
      />
    )
  }

  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.div
          key={`${page}-${viewMode}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={
            viewMode === 'list'
              ? 'flex flex-col gap-4'
              : 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'
          }
        >
          {paginated.map((property) => (
            <PropertyCard key={property.id} property={property} viewMode={viewMode} />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors
                ${p === page
                  ? 'bg-blue-600 text-white border border-blue-600'
                  : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      <p className="text-center text-sm text-gray-500 mt-4">
        Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, properties.length)} of {properties.length} properties
      </p>
    </div>
  )
}
