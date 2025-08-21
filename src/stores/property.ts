import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Property, PropertySearchParams, PropertySearchResult } from '@/types/property'
import { PropertyType, PropertyStatus } from '@/types/property'

// Thai agent avatars - professional looking Asian people
function getThaiAgentAvatar(): string {
  const thaiAvatars = [
    // Professional Asian men
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face',

    // Professional Asian women
    'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
  ]

  return thaiAvatars[Math.floor(Math.random() * thaiAvatars.length)]
}

// Agent names for both languages
function getAgentName(language: string): string {
  const agentNames = [
    // Male agents
    {
      th: 'คุณสมชาย วงศ์ใหญ่',
      en: 'Somchai Wongjai',
    },
    {
      th: 'คุณวิชัย ธนาวัฒน์',
      en: 'Wichai Thanawat',
    },
    {
      th: 'คุณนิรันดร์ สุขสวัสดิ์',
      en: 'Nirun Sukswat',
    },
    {
      th: 'คุณชาญ เจริญสุข',
      en: 'Chan Charoensuek',
    },
    {
      th: 'คุณธนา รุ่งเรือง',
      en: 'Thana Rungruang',
    },
    {
      th: 'คุณปิติ มั่งมี',
      en: 'Piti Mangmee',
    },
    {
      th: 'คุณสุรชัย ศรีสุข',
      en: 'Surachai Srisuek',
    },
    {
      th: 'คุณอนุชา เจริญทรัพย์',
      en: 'Anucha Charoenthap',
    },

    // Female agents
    {
      th: 'คุณสมหญิง จันทร์เพ็ญ',
      en: 'Somying Chanpen',
    },
    {
      th: 'คุณสุดา ทองดี',
      en: 'Suda Thongdee',
    },
    {
      th: 'คุณพิมพ์ สวยงาม',
      en: 'Pim Suayngam',
    },
    {
      th: 'คุณมาลี ใจดี',
      en: 'Malee Jaidee',
    },
    {
      th: 'คุณนิภา สุขใส',
      en: 'Nipha Suksai',
    },
    {
      th: 'คุณวรรณา เรืองรอง',
      en: 'Wanna Ruangrong',
    },
    {
      th: 'คุณสุนิสา ปัญญาดี',
      en: 'Sunisa Panyadee',
    },
    {
      th: 'คุณอรุณี มีสุข',
      en: 'Arunee Meesuek',
    },
  ]

  const randomAgent = agentNames[Math.floor(Math.random() * agentNames.length)]
  return language === 'th' ? randomAgent.th : randomAgent.en
}

// Property translations
const propertyTranslations = {
  en: {
    cities: [
      'New York',
      'Los Angeles',
      'Chicago',
      'Houston',
      'Phoenix',
      'Philadelphia',
      'San Antonio',
      'San Diego',
    ],
    states: ['NY', 'CA', 'IL', 'TX', 'AZ', 'PA', 'TX', 'CA'],
    titleTemplates: [
      'Beautiful {type} in {city}',
      'Stunning {type} in {city}',
      'Modern {type} in {city}',
      'Luxury {type} in {city}',
      'Spacious {type} in {city}',
    ],
    descriptions: [
      'This stunning {type} offers modern living with premium amenities. Perfect for families or professionals looking for comfort and style.',
      'Experience luxury living in this beautifully designed {type}. Features include modern appliances and elegant finishes throughout.',
      'Discover your new home in this exceptional {type}. Offering comfort, convenience, and contemporary design.',
      'This remarkable {type} combines style and functionality. Ideal for those seeking quality and sophistication.',
      'Welcome to this impressive {type} featuring modern amenities and thoughtful design elements.',
    ],
    features: [
      'Modern Kitchen',
      'Hardwood Floors',
      'Central Air',
      'Garage',
      'Garden',
      'Swimming Pool',
      'Balcony',
      'Fireplace',
      'Walk-in Closet',
      'Granite Countertops',
      'Stainless Steel Appliances',
      'Marble Bathroom',
      'High Ceilings',
      'City View',
      'Security System',
      'Gym Access',
    ],
  },
  th: {
    cities: [
      'กรุงเทพฯ',
      'เชียงใหม่',
      'ภูเก็ต',
      'พัทยา',
      'หัวหิน',
      'เชียงราย',
      'อุดรธานี',
      'ขอนแก่น',
    ],
    states: [
      'กทม.',
      'เชียงใหม่',
      'ภูเก็ต',
      'ชลบุรี',
      'ประจวบคีรีขันธ์',
      'เชียงราย',
      'อุดรธานี',
      'ขอนแก่น',
    ],
    titleTemplates: [
      '{type}สวยงามใน{city}',
      '{type}หรูหราใน{city}',
      '{type}ทันสมัยใน{city}',
      '{type}คุณภาพใน{city}',
      '{type}กว้างขวางใน{city}',
    ],
    descriptions: [
      '{type}สุดหรูนี้มีสิ่งอำนวยความสะดวกครบครัน เหมาะสำหรับครอบครัวหรือผู้เชี่ยวชาญที่ต้องการความสะดวกสบายและสไตล์',
      'สัมผัสการใช้ชีวิตหรูหราใน{type}ที่ออกแบบอย่างสวยงาม มีเครื่องใช้ไฟฟ้าทันสมัยและการตกแต่งที่หรูหรา',
      'ค้นพบบ้านใหม่ของคุณใน{type}ที่ยอดเยี่ยมนี้ มอบความสะดวกสบาย ความสะดวก และการออกแบบร่วมสมัย',
      '{type}ที่น่าทึ่งนี้ผสมผสานสไตล์และการใช้งาน เหมาะสำหรับผู้ที่แสวงหาคุณภาพและความซับซ้อน',
      'ยินดีต้อนรับสู่{type}ที่น่าประทับใจนี้ มีสิ่งอำนวยความสะดวกทันสมัยและองค์ประกอบการออกแบบที่ใส่ใจ',
    ],
    features: [
      'ครัวทันสมัย',
      'พื้นไม้แข็ง',
      'แอร์กลาง',
      'โรงรถ',
      'สวน',
      'สระว่ายน้ำ',
      'ระเบียง',
      'เตาผิง',
      'ตู้เสื้อผ้าขนาดใหญ่',
      'เคาน์เตอร์หินแกรนิต',
      'เครื่องใช้ไฟฟ้าสแตนเลส',
      'ห้องน้ำหินอ่อน',
      'เพดานสูง',
      'วิวเมือง',
      'ระบบรักษาความปลอดภัย',
      'ฟิตเนส',
    ],
  },
}

export const usePropertyStore = defineStore('property', () => {
  const properties = ref<Property[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const currentProperty = ref<Property | null>(null)
  const currentLanguage = ref<'en' | 'th'>('en')

  // Computed properties
  const featuredProperties = computed(() =>
    properties.value.filter((p) => p.status === PropertyStatus.FOR_SALE).slice(0, 6),
  )

  const propertiesForSale = computed(() =>
    properties.value.filter((p) => p.status === PropertyStatus.FOR_SALE),
  )

  const propertiesForRent = computed(() =>
    properties.value.filter((p) => p.status === PropertyStatus.FOR_RENT),
  )

  // Actions
  async function fetchProperties(language: 'en' | 'th' = 'en') {
    loading.value = true
    error.value = null
    currentLanguage.value = language

    try {
      console.log('Starting to fetch properties...')
      // Simulate API call with mock data
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log('Generating mock properties...')
      const mockData = generateMockProperties(language)
      console.log('Generated properties:', mockData.length)

      properties.value = mockData
      console.log('Properties loaded successfully:', properties.value.length)
    } catch (err) {
      error.value = 'Failed to fetch properties'
      console.error('Error fetching properties:', err)
    } finally {
      loading.value = false
    }
  }

  async function fetchPropertyById(id: string): Promise<Property | null> {
    loading.value = true
    error.value = null

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      const property = properties.value.find((p) => p.id === id) || null
      currentProperty.value = property
      return property
    } catch (err) {
      error.value = 'Failed to fetch property'
      console.error('Error fetching property:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  function searchProperties(params: PropertySearchParams): PropertySearchResult {
    let filtered = [...properties.value]
    const { filters, sortBy, sortOrder, page, limit } = params

    // Apply filters
    if (filters.type) {
      filtered = filtered.filter((p) => p.type === filters.type)
    }
    if (filters.status) {
      filtered = filtered.filter((p) => p.status === filters.status)
    }
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter((p) => p.price >= filters.minPrice!)
    }
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter((p) => p.price <= filters.maxPrice!)
    }
    if (filters.minBedrooms !== undefined) {
      filtered = filtered.filter((p) => p.bedrooms >= filters.minBedrooms!)
    }
    if (filters.maxBedrooms !== undefined) {
      filtered = filtered.filter((p) => p.bedrooms <= filters.maxBedrooms!)
    }
    if (filters.city) {
      filtered = filtered.filter((p) =>
        p.address.city.toLowerCase().includes(filters.city!.toLowerCase()),
      )
    }
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.address.city.toLowerCase().includes(query) ||
          p.address.state.toLowerCase().includes(query),
      )
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: number | Date, bValue: number | Date

      switch (sortBy) {
        case 'price':
          aValue = a.price
          bValue = b.price
          break
        case 'date':
          aValue = a.createdAt
          bValue = b.createdAt
          break
        case 'area':
          aValue = a.area
          bValue = b.area
          break
        case 'bedrooms':
          aValue = a.bedrooms
          bValue = b.bedrooms
          break
        default:
          return 0
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    // Apply pagination
    const total = filtered.length
    const totalPages = Math.ceil(total / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedProperties = filtered.slice(startIndex, endIndex)

    return {
      properties: paginatedProperties,
      total,
      page,
      totalPages,
    }
  }

  // Function to refresh properties when language changes
  async function refreshPropertiesForLanguage(language: 'en' | 'th') {
    await fetchProperties(language)
  }

  return {
    properties,
    loading,
    error,
    currentProperty,
    currentLanguage,
    featuredProperties,
    propertiesForSale,
    propertiesForRent,
    fetchProperties,
    fetchPropertyById,
    searchProperties,
    refreshPropertiesForLanguage,
  }
})

// Mock data generator
function generateMockProperties(language: 'en' | 'th' = 'en'): Property[] {
  try {
    const mockProperties: Property[] = []
    const translations = propertyTranslations[language]

    const cities = translations.cities
    const states = translations.states
    const propertyTypes = Object.values(PropertyType)
    const statuses = [PropertyStatus.FOR_SALE, PropertyStatus.FOR_RENT]

    console.log('Property types:', propertyTypes)
    console.log('Property statuses:', statuses)

    for (let i = 1; i <= 50; i++) {
      const cityIndex = Math.floor(Math.random() * cities.length)
      const type = propertyTypes[Math.floor(Math.random() * propertyTypes.length)]
      const status = statuses[Math.floor(Math.random() * statuses.length)]
      const bedrooms = Math.floor(Math.random() * 5) + 1
      const bathrooms = Math.floor(Math.random() * 4) + 1
      const area = Math.floor(Math.random() * 3000) + 800

      // Generate translated content
      const titleTemplate =
        translations.titleTemplates[Math.floor(Math.random() * translations.titleTemplates.length)]
      const descriptionTemplate =
        translations.descriptions[Math.floor(Math.random() * translations.descriptions.length)]

      // Get translated property type
      const typeTranslations = {
        en: {
          house: 'house',
          apartment: 'apartment',
          condo: 'condo',
          townhouse: 'townhouse',
          villa: 'villa',
          land: 'land',
          commercial: 'commercial',
        },
        th: {
          house: 'บ้าน',
          apartment: 'อพาร์ตเมนต์',
          condo: 'คอนโด',
          townhouse: 'ทาวน์เฮาส์',
          villa: 'วิลล่า',
          land: 'ที่ดิน',
          commercial: 'เชิงพาณิชย์',
        },
      }
      const translatedType = typeTranslations[language][type] || type

      mockProperties.push({
        id: `property-${i}`,
        title: titleTemplate.replace('{type}', translatedType).replace('{city}', cities[cityIndex]),
        description: descriptionTemplate.replace('{type}', translatedType),
        price:
          status === PropertyStatus.FOR_SALE
            ? Math.floor(Math.random() * 20000000) + 5000000 // Thai prices in Baht
            : Math.floor(Math.random() * 50000) + 10000,
        type,
        status,
        bedrooms,
        bathrooms,
        area,
        yearBuilt: Math.floor(Math.random() * 30) + 1990,
        address: {
          street:
            language === 'th'
              ? `${Math.floor(Math.random() * 999) + 1} ถนนสุขุมวิท`
              : `${Math.floor(Math.random() * 9999) + 1} Main St`,
          city: cities[cityIndex],
          state: states[cityIndex],
          zipCode: `${Math.floor(Math.random() * 90000) + 10000}`,
          country: language === 'th' ? 'ประเทศไทย' : 'USA',
          coordinates: {
            lat:
              language === 'th'
                ? 13.7563 + (Math.random() - 0.5) * 2
                : 40.7128 + (Math.random() - 0.5) * 10,
            lng:
              language === 'th'
                ? 100.5018 + (Math.random() - 0.5) * 2
                : -74.006 + (Math.random() - 0.5) * 10,
          },
        },
        images: [
          `https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop`,
          `https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop`,
          `https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop`,
        ],
        features: translations.features
          .sort(() => 0.5 - Math.random())
          .slice(0, Math.floor(Math.random() * 4) + 2),
        agent: {
          id: `agent-${Math.floor(Math.random() * 10) + 1}`,
          name: getAgentName(language),
          email: `agent${Math.floor(Math.random() * 10) + 1}@realestate.com`,
          phone:
            language === 'th'
              ? `+66 ${Math.floor(Math.random() * 9) + 1}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`
              : `+1 (555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
          avatar: getThaiAgentAvatar(),
        },
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(),
      })
    }

    console.log('Mock properties generated:', mockProperties.length)
    return mockProperties
  } catch (error) {
    console.error('Error generating mock properties:', error)
    // Return a simple fallback property
    return [
      {
        id: 'fallback-1',
        title: 'Sample Property',
        description: 'A beautiful sample property',
        price: 500000,
        type: PropertyType.HOUSE,
        status: PropertyStatus.FOR_SALE,
        bedrooms: 3,
        bathrooms: 2,
        area: 1500,
        yearBuilt: 2020,
        address: {
          street: '123 Main St',
          city: 'Sample City',
          state: 'CA',
          zipCode: '12345',
          country: 'USA',
        },
        images: [
          'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop',
        ],
        features: ['Modern Kitchen', 'Hardwood Floors'],
        agent: {
          id: 'agent-1',
          name: getAgentName('th'),
          email: 'agent@example.com',
          phone: '+66 2-123-4567',
          avatar: getThaiAgentAvatar(),
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]
  }
}
