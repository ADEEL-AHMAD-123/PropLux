import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Property, SearchFilters } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number, listingType?: string): string {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)

  if (listingType === 'rent' || listingType === 'short-term') {
    return `${formatted}/mo`
  }
  return formatted
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num)
}

export function formatSqft(sqft: number): string {
  return `${new Intl.NumberFormat('en-US').format(sqft)} sqft`
}

export function getPropertyTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    house: 'House',
    apartment: 'Apartment',
    condo: 'Condo',
    townhouse: 'Townhouse',
    villa: 'Villa',
    studio: 'Studio',
    office: 'Office',
    retail: 'Retail',
    warehouse: 'Warehouse',
    land: 'Land',
    vacation: 'Vacation',
  }
  return labels[type] || type
}

export function filterProperties(properties: Property[], filters: SearchFilters): Property[] {
  return properties.filter((p) => {
    // Query search
    if (filters.query) {
      const q = filters.query.toLowerCase()
      const matches =
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.address.city.toLowerCase().includes(q) ||
        p.address.state.toLowerCase().includes(q) ||
        p.address.street.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      if (!matches) return false
    }

    // Listing type
    if (filters.listingType !== 'all' && p.listingType !== filters.listingType) return false

    // Property type
    if (filters.propertyType !== 'all' && p.type !== filters.propertyType) return false

    // Price
    if (p.price < filters.minPrice || p.price > filters.maxPrice) return false

    // Bedrooms
    if (filters.bedrooms !== 'any') {
      const minBeds = parseInt(filters.bedrooms)
      if (p.specs.bedrooms < minBeds) return false
    }

    // Bathrooms
    if (filters.bathrooms !== 'any') {
      const minBaths = parseInt(filters.bathrooms)
      if (p.specs.bathrooms < minBaths) return false
    }

    // Sqft
    if (p.specs.sqft < filters.minSqft || p.specs.sqft > filters.maxSqft) return false

    // Amenities
    if (filters.amenities.length > 0) {
      const hasAll = filters.amenities.every((a) => p.amenities.includes(a))
      if (!hasAll) return false
    }

    // City
    if (filters.city && !p.address.city.toLowerCase().includes(filters.city.toLowerCase())) return false

    // State
    if (filters.state && !p.address.state.toLowerCase().includes(filters.state.toLowerCase())) return false

    return true
  })
}

export function sortProperties(properties: Property[], sortBy: string): Property[] {
  const sorted = [...properties]
  switch (sortBy) {
    case 'newest':
      return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    case 'oldest':
      return sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price)
    case 'sqft-desc':
      return sorted.sort((a, b) => b.specs.sqft - a.specs.sqft)
    case 'sqft-asc':
      return sorted.sort((a, b) => a.specs.sqft - b.specs.sqft)
    case 'featured':
      return sorted.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
    default:
      return sorted
  }
}

export function calculateMortgage(
  homePrice: number,
  downPayment: number,
  annualRate: number,
  years: number
): { monthly: number; totalPayment: number; totalInterest: number } {
  const principal = homePrice - downPayment
  const monthlyRate = annualRate / 100 / 12
  const numPayments = years * 12

  if (monthlyRate === 0) {
    const monthly = principal / numPayments
    return { monthly, totalPayment: monthly * numPayments, totalInterest: 0 }
  }

  const monthly =
    (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
    (Math.pow(1 + monthlyRate, numPayments) - 1)

  const totalPayment = monthly * numPayments
  const totalInterest = totalPayment - principal

  return { monthly, totalPayment, totalInterest }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

export function timeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffSecs = Math.floor(diffMs / 1000)
  const diffMins = Math.floor(diffSecs / 60)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)
  const diffWeeks = Math.floor(diffDays / 7)
  const diffMonths = Math.floor(diffDays / 30)

  if (diffSecs < 60) return 'just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  if (diffWeeks < 4) return `${diffWeeks}w ago`
  if (diffMonths < 12) return `${diffMonths}mo ago`
  return `${Math.floor(diffMonths / 12)}y ago`
}
