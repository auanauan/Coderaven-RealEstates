<template>
  <div class="relative">
    <button
      @click="isOpen = !isOpen"
      class="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 rounded-md transition-colors"
      :class="{ 'text-primary-600 bg-primary-50': isOpen }"
    >
      <span class="text-lg">{{ currentLanguage.flag }}</span>
      <span class="hidden sm:block">{{ currentLanguage.name }}</span>
      <ChevronDownIcon class="w-4 h-4" :class="{ 'rotate-180': isOpen }" />
    </button>

    <!-- Dropdown -->
    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50"
      @click.stop
    >
      <div class="py-1">
        <button
          v-for="language in availableLanguages"
          :key="language.code"
          @click="switchLanguage(language.code)"
          class="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          :class="{ 'bg-primary-50 text-primary-600': currentLocale === language.code }"
        >
          <span class="text-lg">{{ language.flag }}</span>
          <span>{{ language.name }}</span>
          <CheckIcon
            v-if="currentLocale === language.code"
            class="w-4 h-4 ml-auto text-primary-600"
          />
        </button>
      </div>
    </div>

    <!-- Backdrop -->
    <div
      v-if="isOpen"
      @click="isOpen = false"
      class="fixed inset-0 z-40"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ChevronDownIcon, CheckIcon } from '@heroicons/vue/24/outline'
import { availableLanguages, changeLanguage, type Language } from '@/i18n'

const { locale } = useI18n()
const isOpen = ref(false)

const currentLocale = computed(() => locale.value as Language)

const currentLanguage = computed(() => {
  return availableLanguages.find(lang => lang.code === currentLocale.value) || availableLanguages[0]
})

const switchLanguage = (newLocale: Language) => {
  changeLanguage(newLocale)
  isOpen.value = false
}

// Close dropdown when clicking outside
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}
</style>
