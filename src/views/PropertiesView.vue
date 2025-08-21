<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
    <!-- Header -->
    <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{ t('nav.properties') }}</h1>
        <p class="mt-2 text-gray-600 dark:text-gray-300">
          {{ t('property.search.searchProperties') }}
        </p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Sidebar - Search & Filters -->
        <div class="lg:col-span-1 lg:sticky lg:top-8 lg:self-start">
          <PropertySearch :filters="searchParams.filters" @update:filters="updateFilters" />
        </div>

        <!-- Main Content -->
        <div class="lg:col-span-3">
          <!-- Controls -->
          <div
            class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0"
          >
            <!-- Results Count -->
            <div class="text-gray-600 dark:text-gray-300">
              <span v-if="!loading">
                {{ t('property.listing.showingResults') }} {{ searchResult.properties.length }}
                {{ t('property.listing.of') }} {{ searchResult.total }}
                {{ t('property.listing.properties') }}
              </span>
              <span v-else>{{ t('common.loading') }}</span>
            </div>

            <!-- View Toggle & Sort -->
            <div class="flex items-center space-x-4">
              <!-- View Toggle -->
              <div class="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  @click="viewMode = 'grid'"
                  :class="[
                    'p-2 rounded-md transition-colors',
                    viewMode === 'grid'
                      ? 'bg-white shadow-sm text-primary-600'
                      : 'text-gray-500 hover:text-gray-700',
                  ]"
                >
                  <Squares2X2Icon class="w-5 h-5" />
                </button>
                <button
                  @click="viewMode = 'list'"
                  :class="[
                    'p-2 rounded-md transition-colors',
                    viewMode === 'list'
                      ? 'bg-white shadow-sm text-primary-600'
                      : 'text-gray-500 hover:text-gray-700',
                  ]"
                >
                  <ListBulletIcon class="w-5 h-5" />
                </button>
              </div>

              <!-- Sort -->
              <select
                v-model="searchParams.sortBy"
                @change="performSearch"
                class="input-field w-auto"
              >
                <option value="date">{{ t('property.listing.newest') }}</option>
                <option value="price">{{ t('property.listing.priceLowToHigh') }}</option>
                <option value="area">{{ t('property.listing.areaLargeToSmall') }}</option>
                <option value="bedrooms">{{ t('property.listing.bedroomsMostToLeast') }}</option>
              </select>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="loading" class="flex justify-center items-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="text-center py-12">
            <div class="text-red-600 mb-4">{{ error }}</div>
            <div class="space-x-4">
              <button @click="retryFetch" class="btn-primary">Retry Fetch</button>
              <button @click="performSearch" class="btn-secondary">Try Search Again</button>
            </div>
            <div class="mt-4 text-sm text-gray-600">
              Properties in store: {{ propertyStore.properties.length }}
            </div>
          </div>

          <!-- Properties Grid/List -->
          <div v-else-if="searchResult.properties.length > 0">
            <div
              :class="[
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'space-y-6',
              ]"
            >
              <PropertyCard
                v-for="property in searchResult.properties"
                :key="property.id"
                :property="property"
              />
            </div>

            <!-- Pagination -->
            <div v-if="searchResult.totalPages > 1" class="mt-8 flex justify-center">
              <nav class="flex items-center space-x-2">
                <button
                  @click="goToPage(searchParams.page - 1)"
                  :disabled="searchParams.page <= 1"
                  class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                <button
                  v-for="page in visiblePages"
                  :key="page"
                  @click="goToPage(page)"
                  :class="[
                    'px-3 py-2 text-sm font-medium rounded-md',
                    page === searchParams.page
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50',
                  ]"
                >
                  {{ page }}
                </button>

                <button
                  @click="goToPage(searchParams.page + 1)"
                  :disabled="searchParams.page >= searchResult.totalPages"
                  class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>

          <!-- No Results -->
          <div v-else class="text-center py-12">
            <div class="text-gray-500 dark:text-gray-400 mb-4">
              {{ t('property.listing.noResults') }}
            </div>
            <button @click="clearFilters" class="btn-secondary">
              {{ t('property.search.clearFilters') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { Squares2X2Icon, ListBulletIcon } from '@heroicons/vue/24/outline'
import PropertyCard from '@/components/property/PropertyCard.vue'
import PropertySearch from '@/components/property/PropertySearch.vue'
import { usePropertyStore } from '@/stores/property'
import type { PropertyFilters, PropertySearchParams, PropertySearchResult } from '@/types/property'

const propertyStore = usePropertyStore()
const { locale, t } = useI18n()

const viewMode = ref<'grid' | 'list'>('grid')
const searchParams = ref<PropertySearchParams>({
  filters: {},
  sortBy: 'date',
  sortOrder: 'desc',
  page: 1,
  limit: 12,
})

const searchResult = ref<PropertySearchResult>({
  properties: [],
  total: 0,
  page: 1,
  totalPages: 1,
})

const loading = computed(() => propertyStore.loading)
const error = computed(() => propertyStore.error)

const visiblePages = computed(() => {
  const current = searchParams.value.page
  const total = searchResult.value.totalPages
  const pages = []

  const start = Math.max(1, current - 2)
  const end = Math.min(total, current + 2)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

const updateFilters = (filters: PropertyFilters) => {
  searchParams.value.filters = filters
  searchParams.value.page = 1
  performSearch()
}

const clearFilters = () => {
  searchParams.value.filters = {}
  searchParams.value.page = 1
  performSearch()
}

const goToPage = (page: number) => {
  searchParams.value.page = page
  performSearch()
}

const performSearch = () => {
  searchResult.value = propertyStore.searchProperties(searchParams.value)
}

const retryFetch = async () => {
  console.log('Retrying fetch...')
  await propertyStore.fetchProperties()
  performSearch()
}

// Watch for sort changes
watch(
  () => searchParams.value.sortBy,
  () => {
    searchParams.value.sortOrder = searchParams.value.sortBy === 'price' ? 'asc' : 'desc'
    performSearch()
  },
)

// Watch for language changes and refresh properties
watch(locale, async (newLocale) => {
  console.log('Language changed to:', newLocale)
  await propertyStore.refreshPropertiesForLanguage(newLocale as 'en' | 'th')
  performSearch()
})

onMounted(async () => {
  console.log('PropertiesView mounted, fetching properties...')
  try {
    await propertyStore.fetchProperties(locale.value as 'en' | 'th')
    console.log('Properties fetched, performing search...')
    performSearch()
    console.log('Search completed')
  } catch (error) {
    console.error('Error in PropertiesView onMounted:', error)
  }
})
</script>
