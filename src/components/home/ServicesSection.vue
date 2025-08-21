<template>
  <section class="py-16 bg-white dark:bg-gray-900 transition-colors">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {{ t('home.ourServices') }}
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {{ t('home.servicesSubtitle') }}
        </p>
      </div>

      <!-- Services Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="service in services"
          :key="service.title"
          class="text-center p-6 rounded-lg hover:shadow-lg dark:hover:shadow-gray-800/50 transition-shadow duration-300 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
        >
          <div
            class="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <component :is="service.icon" class="w-8 h-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            {{ service.title }}
          </h3>
          <p class="text-gray-600 dark:text-gray-300 leading-relaxed">{{ service.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  HomeIcon,
  CurrencyDollarIcon,
  KeyIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ChartBarIcon,
} from '@heroicons/vue/24/outline'

const { t } = useI18n()

const services = computed(() => [
  {
    title: t('services.propertySales.title'),
    description: t('services.propertySales.description'),
    icon: HomeIcon,
  },
  {
    title: t('services.propertyRentals.title'),
    description: t('services.propertyRentals.description'),
    icon: KeyIcon,
  },
  {
    title: t('services.marketAnalysis.title'),
    description: t('services.marketAnalysis.description'),
    icon: ChartBarIcon,
  },
  {
    title: t('services.investmentConsulting.title'),
    description: t('services.investmentConsulting.description'),
    icon: CurrencyDollarIcon,
  },
  {
    title: t('services.legalDocumentation.title'),
    description: t('services.legalDocumentation.description'),
    icon: DocumentTextIcon,
  },
  {
    title: t('services.clientSupport.title'),
    description: t('services.clientSupport.description'),
    icon: UserGroupIcon,
  },
])
</script>
