export interface Property {
  id: string
  title: string
  description: string
  price: number
  type: PropertyType
  status: PropertyStatus
  bedrooms: number
  bathrooms: number
  area: number // in square feet
  yearBuilt: number
  address: Address
  images: string[]
  features: string[]
  agent: Agent
  createdAt: Date
  updatedAt: Date
}

export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  coordinates?: {
    lat: number
    lng: number
  }
}

export interface Agent {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  bio?: string
}

export enum PropertyType {
  HOUSE = 'house',
  APARTMENT = 'apartment',
  CONDO = 'condo',
  TOWNHOUSE = 'townhouse',
  VILLA = 'villa',
  LAND = 'land',
  COMMERCIAL = 'commercial'
}

export enum PropertyStatus {
  FOR_SALE = 'for_sale',
  FOR_RENT = 'for_rent',
  SOLD = 'sold',
  RENTED = 'rented',
  PENDING = 'pending'
}

export interface PropertyFilters {
  type?: PropertyType
  status?: PropertyStatus
  minPrice?: number
  maxPrice?: number
  minBedrooms?: number
  maxBedrooms?: number
  minBathrooms?: number
  maxBathrooms?: number
  minArea?: number
  maxArea?: number
  city?: string
  state?: string
  searchQuery?: string
}

export interface PropertySearchParams {
  filters: PropertyFilters
  sortBy: 'price' | 'date' | 'area' | 'bedrooms'
  sortOrder: 'asc' | 'desc'
  page: number
  limit: number
}

export interface PropertySearchResult {
  properties: Property[]
  total: number
  page: number
  totalPages: number
}
