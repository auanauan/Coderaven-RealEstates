<template>
  <div class="card hover:shadow-lg transition-shadow duration-300">
    <!-- Image -->
    <div class="relative">
      <img :src="property.images[0]" :alt="property.title" class="w-full h-48 object-cover" />
      <div class="absolute top-2 left-2">
        <span class="px-2 py-1 text-xs font-medium rounded-full" :class="statusClasses">
          {{ statusText }}
        </span>
      </div>
      <div class="absolute top-2 right-2">
        <span
          class="bg-white dark:bg-gray-800 px-2 py-1 text-xs font-medium rounded-full text-gray-900 dark:text-white"
        >
          {{ property.type }}
        </span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-4">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
        {{ property.title }}
      </h3>

      <p class="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
        {{ property.description }}
      </p>

      <!-- Location -->
      <div class="flex items-center text-gray-500 text-sm mb-3">
        <MapPinIcon class="w-4 h-4 mr-1" />
        <span>{{ property.address.city }}, {{ property.address.state }}</span>
      </div>

      <!-- Property Details -->
      <div class="flex items-center justify-between text-sm text-gray-600 mb-4">
        <div class="flex items-center space-x-4">
          <div class="flex items-center">
            <HomeIcon class="w-4 h-4 mr-1" />
            <span>{{ property.bedrooms }} bed</span>
          </div>
          <div class="flex items-center">
            <span class="w-4 h-4 mr-1">🛁</span>
            <span>{{ property.bathrooms }} bath</span>
          </div>
          <div class="flex items-center">
            <span class="w-4 h-4 mr-1">📐</span>
            <span>{{ formatArea(property.area) }}</span>
          </div>
        </div>
      </div>

      <!-- Price -->
      <div class="flex items-center justify-between">
        <div class="text-2xl font-bold text-primary-600">
          {{ formatPrice(property.price) }}
          <span
            v-if="property.status === PropertyStatus.FOR_RENT"
            class="text-sm text-gray-500 dark:text-gray-400"
            >{{ t('property.perMonth') }}</span
          >
        </div>

        <router-link
          :to="{ name: 'property-detail', params: { id: property.id } }"
          class="btn-primary text-sm"
        >
          {{ t('common.viewDetails') }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { MapPinIcon, HomeIcon } from '@heroicons/vue/24/outline'
import type { Property } from '@/types/property'
import { PropertyStatus } from '@/types/property'

interface Props {
  property: Property
}

const props = defineProps<Props>()
const { t } = useI18n()

const statusClasses = computed(() => {
  switch (props.property.status) {
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
  switch (props.property.status) {
    case PropertyStatus.FOR_SALE:
      return t('property.status.forSale')
    case PropertyStatus.FOR_RENT:
      return t('property.status.forRent')
    case PropertyStatus.SOLD:
      return t('property.status.sold')
    case PropertyStatus.RENTED:
      return t('property.status.rented')
    case PropertyStatus.PENDING:
      return t('property.status.pending')
    default:
      return props.property.status
  }
})

function formatPrice(price: number): string {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

function formatArea(area: number): string {
  return `${area.toLocaleString()} ตร.ม.`
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
