export type PropertyType =
  | 'house'
  | 'apartment'
  | 'condo'
  | 'townhouse'
  | 'villa'
  | 'studio'
  | 'office'
  | 'retail'
  | 'warehouse'
  | 'land'
  | 'vacation'

export type ListingType = 'sale' | 'rent' | 'short-term'
export type PropertyStatus = 'active' | 'pending' | 'sold' | 'rented'

export interface Address {
  street: string
  city: string
  state: string
  zip: string
  country: string
}

export interface Coordinates {
  lat: number
  lng: number
}

export interface PropertySpecs {
  bedrooms: number
  bathrooms: number
  sqft: number
  garage: number
  yearBuilt: number
  lotSize?: number
}

export interface Property {
  id: string
  title: string
  description: string
  type: PropertyType
  listingType: ListingType
  status: PropertyStatus
  price: number
  pricePerSqft?: number
  address: Address
  coordinates: Coordinates
  specs: PropertySpecs
  amenities: string[]
  features: string[]
  images: string[]
  agentId: string
  views: number
  isFeatured: boolean
  isNew: boolean
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface Agent {
  id: string
  name: string
  email: string
  phone: string
  photo: string
  agency: string
  bio: string
  rating: number
  reviewCount: number
  listingsCount: number
  yearsExperience: number
  specializations: string[]
  languages: string[]
}

export interface SearchFilters {
  query: string
  listingType: 'all' | ListingType
  propertyType: 'all' | PropertyType
  minPrice: number
  maxPrice: number
  bedrooms: string
  bathrooms: string
  minSqft: number
  maxSqft: number
  amenities: string[]
  city: string
  state: string
  sortBy: string
}

export interface MortgageCalcInput {
  homePrice: number
  downPayment: number
  annualRate: number
  years: number
}

export interface MortgageResult {
  monthly: number
  totalPayment: number
  totalInterest: number
  principal: number
  monthlyTax: number
  monthlyInsurance: number
  monthlyPMI: number
}

export interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  createdAt: string
  read: boolean
}

export interface Conversation {
  id: string
  participants: string[]
  messages: Message[]
  propertyId?: string
  lastMessage: string
  updatedAt: string
}
