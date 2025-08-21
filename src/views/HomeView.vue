<script setup lang="ts">
import { watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import HeroSection from '@/components/home/HeroSection.vue'
import FeaturedProperties from '@/components/home/FeaturedProperties.vue'
import ServicesSection from '@/components/home/ServicesSection.vue'
import { usePropertyStore } from '@/stores/property'

const { locale } = useI18n()
const propertyStore = usePropertyStore()

// Watch for language changes and refresh properties
watch(locale, async (newLocale) => {
  await propertyStore.refreshPropertiesForLanguage(newLocale as 'en' | 'th')
})

onMounted(async () => {
  if (propertyStore.properties.length === 0) {
    await propertyStore.fetchProperties(locale.value as 'en' | 'th')
  }
})
</script>

<template>
  <main>
    <HeroSection />
    <FeaturedProperties />
    <ServicesSection />
  </main>
</template>
