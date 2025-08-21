import { createI18n } from 'vue-i18n'
import { englishTranslations } from '@/locales/en'
import { thaiTranslations } from '@/locales/th'

// Get saved language from localStorage or default to English
const savedLanguage = localStorage.getItem('language') || 'en'

const messages = {
  en: englishTranslations,
  th: thaiTranslations
}

const i18n = createI18n({
  legacy: false, // Use Composition API mode
  locale: savedLanguage,
  fallbackLocale: 'en',
  messages
})

export default i18n

// Helper function to change language
export const changeLanguage = (locale: 'en' | 'th') => {
  i18n.global.locale.value = locale
  localStorage.setItem('language', locale)
  
  // Update document language and direction
  document.documentElement.lang = locale
  
  // Update page title based on language
  const titles = {
    en: 'RealEstate - Find Your Dream Home',
    th: 'อสังหาริมทรัพย์ - ค้นหาบ้านในฝันของคุณ'
  }
  document.title = titles[locale]
}

// Available languages
export const availableLanguages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭' }
] as const

export type Language = typeof availableLanguages[number]['code']
