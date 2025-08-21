<template>
  <section
    class="relative bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-700 dark:to-primary-900 text-white"
  >
    <!-- Background Image Overlay -->
    <div class="absolute inset-0 bg-black bg-opacity-40 dark:bg-opacity-50"></div>

    <!-- Background Image -->
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style="
        background-image: url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&h=1080&fit=crop');
      "
    ></div>

    <!-- Content -->
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
      <div class="text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
          {{ t('home.heroTitle') }}
        </h1>
        <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90 animate-slide-up">
          {{ t('home.heroSubtitle') }}
        </p>

        <!-- Search Bar -->
        <div class="max-w-4xl mx-auto mb-8 animate-slide-up">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/50 p-4">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <!-- Location -->
              <div class="relative">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >ที่ตั้ง</label
                >
                <div class="relative">
                  <MapPinIcon
                    class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  />
                  <input
                    v-model="searchForm.location"
                    type="text"
                    :placeholder="t('property.search.searchPlaceholder')"
                    class="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
              </div>

              <!-- Property Type -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{
                  t('property.type')
                }}</label>
                <select
                  v-model="searchForm.type"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white bg-white dark:bg-gray-700"
                >
                  <option value="">{{ t('property.search.allTypes') }}</option>
                  <option value="house">{{ t('property.types.house') }}</option>
                  <option value="apartment">{{ t('property.types.apartment') }}</option>
                  <option value="condo">{{ t('property.types.condo') }}</option>
                  <option value="townhouse">{{ t('property.types.townhouse') }}</option>
                </select>
              </div>

              <!-- Price Range -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{
                  t('property.price')
                }}</label>
                <select
                  v-model="searchForm.priceRange"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white bg-white dark:bg-gray-700"
                >
                  <option value="">{{ t('property.search.anyPrice') }}</option>
                  <option value="0-2000000">{{ t('property.search.priceRanges.under2M') }}</option>
                  <option value="2000000-5000000">
                    {{ t('property.search.priceRanges.2to5M') }}
                  </option>
                  <option value="5000000-10000000">
                    {{ t('property.search.priceRanges.5to10M') }}
                  </option>
                  <option value="10000000-20000000">
                    {{ t('property.search.priceRanges.10to20M') }}
                  </option>
                  <option value="20000000-">{{ t('property.search.priceRanges.over20M') }}</option>
                </select>
              </div>

              <!-- Search Button -->
              <div class="flex items-end">
                <button
                  @click="performSearch"
                  class="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center"
                >
                  <MagnifyingGlassIcon class="w-5 h-5 mr-2" />
                  {{ t('common.search') }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
          <router-link
            to="/properties"
            class="bg-white text-primary-600 hover:bg-gray-50 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
          >
            {{ t('home.viewAllProperties') }}
            <ArrowRightIcon class="w-5 h-5 ml-2" />
          </router-link>
          <button
            class="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
          >
            {{ t('nav.listProperty') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="relative bg-white bg-opacity-10 backdrop-blur-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div class="text-3xl md:text-4xl font-bold mb-2">500+</div>
            <div class="text-sm md:text-base opacity-90">Properties Listed</div>
          </div>
          <div>
            <div class="text-3xl md:text-4xl font-bold mb-2">200+</div>
            <div class="text-sm md:text-base opacity-90">Happy Clients</div>
          </div>
          <div>
            <div class="text-3xl md:text-4xl font-bold mb-2">50+</div>
            <div class="text-sm md:text-base opacity-90">Expert Agents</div>
          </div>
          <div>
            <div class="text-3xl md:text-4xl font-bold mb-2">10+</div>
            <div class="text-sm md:text-base opacity-90">Years Experience</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { MapPinIcon, MagnifyingGlassIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'

const router = useRouter()
const { t } = useI18n()

const searchForm = reactive({
  location: '',
  type: '',
  priceRange: '',
})

const performSearch = () => {
  const query: Record<string, string> = {}

  if (searchForm.location) {
    query.city = searchForm.location
  }

  if (searchForm.type) {
    query.type = searchForm.type
  }

  if (searchForm.priceRange) {
    const [min, max] = searchForm.priceRange.split('-')
    if (min) query.minPrice = min
    if (max) query.maxPrice = max
  }

  router.push({
    name: 'properties',
    query,
  })
}
</script>
