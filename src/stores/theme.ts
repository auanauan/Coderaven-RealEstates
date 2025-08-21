import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

export type Theme = 'light' | 'dark' | 'system'

export const useThemeStore = defineStore('theme', () => {
  // Get saved theme from localStorage or default to system
  const savedTheme = localStorage.getItem('theme') as Theme || 'system'
  const theme = ref<Theme>(savedTheme)

  // Check system preference
  const systemPrefersDark = ref(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  )

  // Listen for system theme changes
  if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', (e) => {
      systemPrefersDark.value = e.matches
    })
  }

  // Computed property for actual theme being used
  const isDark = computed(() => {
    if (theme.value === 'system') {
      return systemPrefersDark.value
    }
    return theme.value === 'dark'
  })

  // Apply theme to document
  const applyTheme = () => {
    const root = document.documentElement
    
    if (isDark.value) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', isDark.value ? '#1f2937' : '#ffffff')
    }
  }

  // Watch for theme changes and apply them
  watch([theme, systemPrefersDark], applyTheme, { immediate: true })

  // Set theme function
  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
  }

  // Toggle between light and dark (skips system)
  const toggleTheme = () => {
    if (theme.value === 'light') {
      setTheme('dark')
    } else if (theme.value === 'dark') {
      setTheme('light')
    } else {
      // If system, toggle to opposite of current system preference
      setTheme(systemPrefersDark.value ? 'light' : 'dark')
    }
  }

  // Available themes with labels
  const availableThemes = [
    { value: 'light', label: 'Light', icon: '☀️' },
    { value: 'dark', label: 'Dark', icon: '🌙' },
    { value: 'system', label: 'System', icon: '💻' }
  ] as const

  // Initialize theme on store creation
  applyTheme()

  return {
    theme,
    isDark,
    systemPrefersDark,
    availableThemes,
    setTheme,
    toggleTheme,
    applyTheme
  }
})
