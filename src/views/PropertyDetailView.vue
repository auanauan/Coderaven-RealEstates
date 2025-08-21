<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center min-h-screen">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error || !property"
      class="flex flex-col justify-center items-center min-h-screen"
    >
      <div class="text-center">
        <h1 class="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
        <p class="text-gray-600 mb-6">
          The property you're looking for doesn't exist or has been removed.
        </p>
        <router-link to="/properties" class="btn-primary"> Back to Properties </router-link>
      </div>
    </div>

    <!-- Property Details -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Breadcrumb -->
      <nav class="flex items-center space-x-2 text-sm text-gray-500 mb-6">
        <router-link to="/" class="hover:text-primary-600">Home</router-link>
        <ChevronRightIcon class="w-4 h-4" />
        <router-link to="/properties" class="hover:text-primary-600">Properties</router-link>
        <ChevronRightIcon class="w-4 h-4" />
        <span class="text-gray-900">{{ property.title }}</span>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Image Gallery -->
          <PropertyGallery :images="property.images" />

          <!-- Property Info -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <div class="flex items-start justify-between mb-4">
              <div>
                <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ property.title }}</h1>
                <div class="flex items-center text-gray-600 mb-4">
                  <MapPinIcon class="w-5 h-5 mr-2" />
                  <span
                    >{{ property.address.street }}, {{ property.address.city }},
                    {{ property.address.state }} {{ property.address.zipCode }}</span
                  >
                </div>
              </div>
              <div class="text-right">
                <div class="text-3xl font-bold text-primary-600">
                  {{ formatPrice(property.price) }}
                  <span
                    v-if="property.status === PropertyStatus.FOR_RENT"
                    class="text-lg text-gray-500"
                    >/month</span
                  >
                </div>
                <span
                  class="inline-block px-3 py-1 text-sm font-medium rounded-full mt-2"
                  :class="statusClasses"
                >
                  {{ statusText }}
                </span>
              </div>
            </div>

            <!-- Property Stats -->
            <div
              class="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-t border-b border-gray-200"
            >
              <div class="text-center">
                <div class="text-2xl font-bold text-gray-900">{{ property.bedrooms }}</div>
                <div class="text-sm text-gray-600">Bedrooms</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-gray-900">{{ property.bathrooms }}</div>
                <div class="text-sm text-gray-600">Bathrooms</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-gray-900">{{ formatArea(property.area) }}</div>
                <div class="text-sm text-gray-600">Square Feet</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-gray-900">{{ property.yearBuilt }}</div>
                <div class="text-sm text-gray-600">Year Built</div>
              </div>
            </div>

            <!-- Description -->
            <div class="pt-6">
              <h2 class="text-xl font-semibold text-gray-900 mb-3">Description</h2>
              <p class="text-gray-700 leading-relaxed">{{ property.description }}</p>
            </div>
          </div>

          <!-- Features -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Features & Amenities</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div
                v-for="feature in property.features"
                :key="feature"
                class="flex items-center space-x-2"
              >
                <CheckIcon class="w-5 h-5 text-green-600" />
                <span class="text-gray-700">{{ feature }}</span>
              </div>
            </div>
          </div>

          <!-- Map Placeholder -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Location</h2>
            <div class="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
              <div class="text-center text-gray-500">
                <MapPinIcon class="w-12 h-12 mx-auto mb-2" />
                <p>Interactive map would be displayed here</p>
                <p class="text-sm">
                  {{ property.address.street }}, {{ property.address.city }},
                  {{ property.address.state }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <div class="sticky top-8 space-y-6">
            <!-- Contact Form -->
            <ContactForm :agent="property.agent" :property-title="property.title" />

            <!-- Property Type & Status -->
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Property Details</h3>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-gray-600">Type:</span>
                  <span class="font-medium">{{ formatPropertyType(property.type) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Status:</span>
                  <span class="font-medium">{{ statusText }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Property ID:</span>
                  <span class="font-medium">{{ property.id }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Listed:</span>
                  <span class="font-medium">{{ formatDate(property.createdAt) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ChevronRightIcon, MapPinIcon, CheckIcon } from '@heroicons/vue/24/outline'
import PropertyGallery from '@/components/property/PropertyGallery.vue'
import ContactForm from '@/components/property/ContactForm.vue'
import { usePropertyStore } from '@/stores/property'
import { PropertyStatus, PropertyType } from '@/types/property'

const route = useRoute()
const router = useRouter()
const propertyStore = usePropertyStore()

const property = computed(() => propertyStore.currentProperty)
const loading = computed(() => propertyStore.loading)
const error = computed(() => propertyStore.error)

const statusClasses = computed(() => {
  if (!property.value) return ''

  switch (property.value.status) {
    case PropertyStatus.FOR_SALE:
      return 'bg-green-100 text-green-800'
    case PropertyStatus.FOR_RENT:
      return 'bg-blue-100 text-blue-800'
    case PropertyStatus.SOLD:
      return 'bg-gray-100 text-gray-800'
    case PropertyStatus.RENTED:
      return 'bg-gray-100 text-gray-800'
    case PropertyStatus.PENDING:
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
})

const statusText = computed(() => {
  if (!property.value) return ''

  switch (property.value.status) {
    case PropertyStatus.FOR_SALE:
      return 'For Sale'
    case PropertyStatus.FOR_RENT:
      return 'For Rent'
    case PropertyStatus.SOLD:
      return 'Sold'
    case PropertyStatus.RENTED:
      return 'Rented'
    case PropertyStatus.PENDING:
      return 'Pending'
    default:
      return property.value.status
  }
})

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

function formatArea(area: number): string {
  return area.toLocaleString()
}

function formatPropertyType(type: PropertyType): string {
  return type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

onMounted(async () => {
  const propertyId = route.params.id as string

  if (!propertyId) {
    router.push('/properties')
    return
  }

  // Fetch properties if not already loaded
  if (propertyStore.properties.length === 0) {
    await propertyStore.fetchProperties()
  }

  // Fetch specific property
  const foundProperty = await propertyStore.fetchPropertyById(propertyId)

  if (!foundProperty) {
    // Property not found, could redirect or show error
    console.error('Property not found:', propertyId)
  }
})
</script>
