<template>
  <section class="py-16 bg-gray-50 dark:bg-gray-800 transition-colors">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {{ t('home.featuredProperties') }}
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {{ t('home.featuredSubtitle') }}
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 dark:border-primary-400"
        ></div>
      </div>

      <!-- Properties Grid -->
      <div
        v-else-if="featuredProperties.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
      >
        <PropertyCard
          v-for="property in featuredProperties"
          :key="property.id"
          :property="property"
          class="animate-fade-in"
        />
      </div>

      <!-- No Properties -->
      <div v-else class="text-center py-12">
        <p class="text-gray-600 dark:text-gray-400">
          No featured properties available at the moment.
        </p>
      </div>

      <!-- View All Button -->
      <div class="text-center">
        <router-link
          to="/properties"
          class="inline-flex items-center bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
        >
          {{ t('home.viewAllProperties') }}
          <ArrowRightIcon class="w-5 h-5 ml-2" />
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowRightIcon } from '@heroicons/vue/24/outline'
import PropertyCard from '@/components/property/PropertyCard.vue'
import { usePropertyStore } from '@/stores/property'

const { t } = useI18n()
const propertyStore = usePropertyStore()

const featuredProperties = computed(() => propertyStore.featuredProperties)
const loading = computed(() => propertyStore.loading)
</script>
