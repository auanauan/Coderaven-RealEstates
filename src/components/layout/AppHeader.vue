<template>
  <header
    class="bg-white dark:bg-gray-900 shadow-sm dark:shadow-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-2">
            <div
              class="w-8 h-8 bg-primary-600 dark:bg-primary-500 rounded-lg flex items-center justify-center"
            >
              <HomeIcon class="w-5 h-5 text-white" />
            </div>
            <span class="text-xl font-bold text-gray-900 dark:text-white">{{
              t('nav.properties')
            }}</span>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <router-link
            to="/"
            class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="{
              'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20':
                $route.path === '/',
            }"
          >
            {{ t('nav.home') }}
          </router-link>
          <router-link
            to="/properties"
            class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="{
              'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20':
                $route.path === '/properties',
            }"
          >
            {{ t('nav.properties') }}
          </router-link>
          <router-link
            to="/about"
            class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="{ 'text-primary-600 bg-primary-50': $route.path === '/about' }"
          >
            {{ t('nav.about') }}
          </router-link>
          <router-link
            to="/contact"
            class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="{ 'text-primary-600 bg-primary-50': $route.path === '/contact' }"
          >
            {{ t('nav.contact') }}
          </router-link>
        </nav>

        <!-- CTA Button & Switchers -->
        <div class="hidden md:flex items-center space-x-4">
          <ThemeSwitcher simple />
          <LanguageSwitcher />
          <button class="btn-primary">{{ t('nav.listProperty') }}</button>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="text-gray-700 hover:text-primary-600 p-2"
          >
            <Bars3Icon v-if="!mobileMenuOpen" class="w-6 h-6" />
            <XMarkIcon v-else class="w-6 h-6" />
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div
        v-if="mobileMenuOpen"
        class="md:hidden border-t border-gray-200 dark:border-gray-700 py-4 transition-colors"
      >
        <div class="flex flex-col space-y-2">
          <router-link
            to="/"
            @click="mobileMenuOpen = false"
            class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-base font-medium"
          >
            {{ t('nav.home') }}
          </router-link>
          <router-link
            to="/properties"
            @click="mobileMenuOpen = false"
            class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-base font-medium"
          >
            {{ t('nav.properties') }}
          </router-link>
          <router-link
            to="/about"
            @click="mobileMenuOpen = false"
            class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-base font-medium"
          >
            {{ t('nav.about') }}
          </router-link>
          <router-link
            to="/contact"
            @click="mobileMenuOpen = false"
            class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-base font-medium"
          >
            {{ t('nav.contact') }}
          </router-link>
          <div class="mt-4 mx-3 space-y-3">
            <div class="flex items-center justify-between">
              <ThemeSwitcher />
              <LanguageSwitcher />
            </div>
            <button class="btn-primary w-full">{{ t('nav.listProperty') }}</button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { HomeIcon, Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import LanguageSwitcher from '@/components/common/LanguageSwitcher.vue'
import ThemeSwitcher from '@/components/common/ThemeSwitcher.vue'

const { t } = useI18n()
const mobileMenuOpen = ref(false)
</script>
