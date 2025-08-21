<template>
  <div class="relative">
    <!-- Simple Toggle Button -->
    <button
      v-if="simple"
      @click="themeStore.toggleTheme()"
      class="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
      :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    >
      <SunIcon v-if="isDark" class="w-5 h-5 text-yellow-500" />
      <MoonIcon v-else class="w-5 h-5 text-gray-600 dark:text-gray-300" />
    </button>

    <!-- Dropdown Menu -->
    <div v-else>
      <button
        @click="isOpen = !isOpen"
        class="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-md transition-colors"
        :class="{ 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20': isOpen }"
      >
        <span class="text-lg">{{ currentTheme.icon }}</span>
        <span class="hidden sm:block">{{ currentTheme.label }}</span>
        <ChevronDownIcon class="w-4 h-4 transition-transform" :class="{ 'rotate-180': isOpen }" />
      </button>

      <!-- Dropdown -->
      <div
        v-if="isOpen"
        class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50"
        @click.stop
      >
        <div class="py-1">
          <button
            v-for="themeOption in themeStore.availableThemes"
            :key="themeOption.value"
            @click="selectTheme(themeOption.value)"
            class="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            :class="{ 
              'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400': themeStore.theme === themeOption.value 
            }"
          >
            <span class="text-lg">{{ themeOption.icon }}</span>
            <span>{{ themeOption.label }}</span>
            <CheckIcon
              v-if="themeStore.theme === themeOption.value"
              class="w-4 h-4 ml-auto text-primary-600 dark:text-primary-400"
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { 
  SunIcon, 
  MoonIcon, 
  ChevronDownIcon, 
  CheckIcon 
} from '@heroicons/vue/24/outline'
import { useThemeStore } from '@/stores/theme'
import type { Theme } from '@/stores/theme'

interface Props {
  simple?: boolean // If true, shows simple toggle button instead of dropdown
}

const props = withDefaults(defineProps<Props>(), {
  simple: false
})

const themeStore = useThemeStore()
const isOpen = ref(false)

const isDark = computed(() => themeStore.isDark)

const currentTheme = computed(() => {
  return themeStore.availableThemes.find(t => t.value === themeStore.theme) || themeStore.availableThemes[0]
})

const selectTheme = (theme: Theme) => {
  themeStore.setTheme(theme)
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
