'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { usePropertyStore } from '@/store/usePropertyStore'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function BuyPage() {
  const router = useRouter()
  const { setFilters } = usePropertyStore()

  useEffect(() => {
    setFilters({ listingType: 'sale' })
    router.replace('/properties')
  }, [router, setFilters])

  return (
    <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  )
}
