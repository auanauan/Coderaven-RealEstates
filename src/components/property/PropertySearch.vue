<template>
  <div
    class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700"
  >
    <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">
      {{ t('property.search.searchProperties') }}
    </h2>

    <!-- Search Input -->
    <div class="mb-6">
      <label for="search" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        {{ t('common.search') }}
      </label>
      <input
        id="search"
        v-model="localFilters.searchQuery"
        type="text"
        :placeholder="t('property.search.searchPlaceholder')"
        class="input-field"
        @input="debouncedEmitFilters"
      />
    </div>

    <!-- Basic Filters -->
    <div class="space-y-6">
      <!-- Property Type -->
      <div>
        <label for="type" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          {{ t('property.type') }}
        </label>
        <select id="type" v-model="localFilters.type" class="input-field" @change="emitFilters">
          <option value="">{{ t('property.search.allTypes') }}</option>
          <option v-for="type in propertyTypes" :key="type" :value="type">
            {{ formatPropertyType(type) }}
          </option>
        </select>
      </div>

      <!-- Status -->
      <div>
        <label
          for="status"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
          >{{ t('property.statusLabel') }}</label
        >
        <select id="status" v-model="localFilters.status" class="input-field" @change="emitFilters">
          <option value="">{{ t('property.search.allStatus') }}</option>
          <option v-for="status in propertyStatuses" :key="status" :value="status">
            {{ formatPropertyStatus(status) }}
          </option>
        </select>
      </div>

      <!-- Bedrooms -->
      <div>
        <label
          for="bedrooms"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
        >
          {{ t('property.bedrooms') }}
        </label>
        <select
          id="bedrooms"
          v-model="localFilters.minBedrooms"
          class="input-field"
          @change="emitFilters"
        >
          <option value="">{{ t('property.search.anyBedrooms') }}</option>
          <option v-for="n in 5" :key="n" :value="n">{{ n }}{{ n === 5 ? '+' : '' }}</option>
        </select>
      </div>

      <!-- City -->
      <div>
        <label for="city" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">{{
          t('property.search.city')
        }}</label>
        <input
          id="city"
          v-model="localFilters.city"
          type="text"
          :placeholder="t('property.search.enterCity')"
          class="input-field"
          @input="debouncedEmitFilters"
        />
      </div>
    </div>

    <!-- Divider -->
    <div class="border-t border-gray-200 dark:border-gray-600 my-6"></div>

    <!-- Price Range -->
    <div class="space-y-4">
      <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">
        {{ t('property.price') }}
      </h3>
      <div class="space-y-4">
        <div>
          <label
            for="minPrice"
            class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2"
          >
            {{ t('property.search.minPrice') }}
          </label>
          <input
            id="minPrice"
            v-model.number="localFilters.minPrice"
            type="number"
            placeholder="0"
            class="input-field"
            @input="debouncedEmitFilters"
          />
        </div>
        <div>
          <label
            for="maxPrice"
            class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2"
          >
            {{ t('property.search.maxPrice') }}
          </label>
          <input
            id="maxPrice"
            v-model.number="localFilters.maxPrice"
            type="number"
            placeholder="No limit"
            class="input-field"
            @input="debouncedEmitFilters"
          />
        </div>
      </div>
    </div>

    <!-- Clear Filters -->
    <div class="pt-6 border-t border-gray-200 dark:border-gray-600">
      <button @click="clearFilters" class="w-full btn-secondary text-sm">
        {{ t('property.search.clearFilters') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { PropertyFilters } from '@/types/property'
import { PropertyType, PropertyStatus } from '@/types/property'

interface Props {
  filters: PropertyFilters
}

interface Emits {
  (e: 'update:filters', filters: PropertyFilters): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const { t } = useI18n()

const localFilters = ref<PropertyFilters>({ ...props.filters })

const propertyTypes = Object.values(PropertyType)
const propertyStatuses = Object.values(PropertyStatus)

// Debounce function for search input
let debounceTimer: ReturnType<typeof setTimeout>
const debouncedEmitFilters = () => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    emitFilters()
  }, 300)
}

const emitFilters = () => {
  emit('update:filters', { ...localFilters.value })
}

const clearFilters = () => {
  localFilters.value = {}
  emitFilters()
}

// Watch for external filter changes
watch(
  () => props.filters,
  (newFilters) => {
    localFilters.value = { ...newFilters }
  },
  { deep: true },
)

function formatPropertyType(type: PropertyType): string {
  const typeKey = type as keyof typeof t.value.property.types
  return (
    t(`property.types.${typeKey}`) || type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')
  )
}

function formatPropertyStatus(status: PropertyStatus): string {
  const statusMap: Record<PropertyStatus, string> = {
    [PropertyStatus.FOR_SALE]: t('property.status.forSale'),
    [PropertyStatus.FOR_RENT]: t('property.status.forRent'),
    [PropertyStatus.SOLD]: t('property.status.sold'),
    [PropertyStatus.RENTED]: t('property.status.rented'),
    [PropertyStatus.PENDING]: t('property.status.pending'),
  }
  return statusMap[status] || status.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}
</script>
