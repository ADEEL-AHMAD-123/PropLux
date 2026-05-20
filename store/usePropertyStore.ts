import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { SearchFilters } from '@/types'

const defaultFilters: SearchFilters = {
  query: '',
  listingType: 'all',
  propertyType: 'all',
  minPrice: 0,
  maxPrice: 10000000,
  bedrooms: 'any',
  bathrooms: 'any',
  minSqft: 0,
  maxSqft: 20000,
  amenities: [],
  city: '',
  state: '',
  sortBy: 'newest',
}

interface PropertyStore {
  filters: SearchFilters
  setFilters: (filters: Partial<SearchFilters>) => void
  resetFilters: () => void
  favorites: string[]
  toggleFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
  viewMode: 'grid' | 'list' | 'map'
  setViewMode: (mode: 'grid' | 'list' | 'map') => void
  compareList: string[]
  addToCompare: (id: string) => void
  removeFromCompare: (id: string) => void
  recentlyViewed: string[]
  addRecentlyViewed: (id: string) => void
  showMapPanel: boolean
  setShowMapPanel: (show: boolean) => void
}

export const usePropertyStore = create<PropertyStore>()(
  persist(
    (set, get) => ({
      filters: defaultFilters,
      setFilters: (filters) =>
        set((state) => ({ filters: { ...state.filters, ...filters } })),
      resetFilters: () => set({ filters: defaultFilters }),

      favorites: [],
      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((f) => f !== id)
            : [...state.favorites, id],
        })),
      isFavorite: (id) => get().favorites.includes(id),

      viewMode: 'grid',
      setViewMode: (mode) => set({ viewMode: mode }),

      compareList: [],
      addToCompare: (id) =>
        set((state) => ({
          compareList: state.compareList.includes(id)
            ? state.compareList
            : [...state.compareList.slice(-2), id],
        })),
      removeFromCompare: (id) =>
        set((state) => ({
          compareList: state.compareList.filter((c) => c !== id),
        })),

      recentlyViewed: [],
      addRecentlyViewed: (id) =>
        set((state) => ({
          recentlyViewed: [id, ...state.recentlyViewed.filter((r) => r !== id)].slice(0, 20),
        })),

      showMapPanel: false,
      setShowMapPanel: (show) => set({ showMapPanel: show }),
    }),
    {
      name: 'proplux-storage',
      partialize: (state) => ({
        favorites: state.favorites,
        recentlyViewed: state.recentlyViewed,
      }),
    }
  )
)
