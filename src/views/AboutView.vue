<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
    <!-- Hero Section -->
    <div class="bg-white dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {{ t('about.title') }}
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {{ t('about.subtitle') }}
          </p>
        </div>
      </div>
    </div>

    <!-- Mission & Vision -->
    <div class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop"
              alt="Modern office building"
              class="rounded-lg shadow-lg"
            />
          </div>
          <div class="space-y-8">
            <div>
              <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {{ t('about.ourMission') }}
              </h2>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                {{ t('about.missionText') }}
              </p>
            </div>
            <div>
              <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {{ t('about.ourVision') }}
              </h2>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                {{ t('about.visionText') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Values -->
    <div class="bg-white dark:bg-gray-800 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {{ t('about.ourValues') }}
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {{ t('about.valuesSubtitle') }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center">
            <div
              class="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <ShieldCheckIcon class="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {{ t('about.integrity') }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              {{ t('about.integrityDesc') }}
            </p>
          </div>

          <div class="text-center">
            <div
              class="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <StarIcon class="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {{ t('about.excellence') }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              {{ t('about.excellenceDesc') }}
            </p>
          </div>

          <div class="text-center">
            <div
              class="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <LightBulbIcon class="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {{ t('about.innovation') }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              {{ t('about.innovationDesc') }}
            </p>
          </div>

          <div class="text-center">
            <div
              class="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <UserGroupIcon class="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {{ t('about.customerFirst') }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              {{ t('about.customerFirstDesc') }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Team Section -->
    <div class="py-16 bg-gray-50 dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {{ t('about.meetOurTeam') }}
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {{ t('about.teamSubtitle') }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="member in teamMembers"
            :key="member.name"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img :src="member.image" :alt="member.name" class="w-full h-64 object-cover" />
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                {{ member.name }}
              </h3>
              <p class="text-primary-600 dark:text-primary-400 font-medium mb-3">
                {{ member.position }}
              </p>
              <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {{ member.bio }}
              </p>
              <div class="flex items-center space-x-3 mt-4">
                <a href="#" class="text-gray-400 hover:text-primary-600 transition-colors">
                  <span class="sr-only">LinkedIn</span>
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" class="text-gray-400 hover:text-primary-600 transition-colors">
                  <span class="sr-only">Email</span>
                  <EnvelopeIcon class="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="bg-primary-600 dark:bg-primary-700 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">{{ t('about.ourAchievements') }}</h2>
          <p class="text-xl opacity-90 max-w-2xl mx-auto">
            {{ t('about.achievementsSubtitle') }}
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div class="text-4xl md:text-5xl font-bold mb-2">5,000+</div>
            <div class="text-lg opacity-90">{{ t('about.propertiesSold') }}</div>
          </div>
          <div>
            <div class="text-4xl md:text-5xl font-bold mb-2">10,000+</div>
            <div class="text-lg opacity-90">{{ t('about.happyClients') }}</div>
          </div>
          <div>
            <div class="text-4xl md:text-5xl font-bold mb-2">15+</div>
            <div class="text-lg opacity-90">{{ t('about.yearsExperience') }}</div>
          </div>
          <div>
            <div class="text-4xl md:text-5xl font-bold mb-2">50+</div>
            <div class="text-lg opacity-90">{{ t('about.teamMembers') }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-white dark:bg-gray-800 py-16">
      <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {{ t('about.readyToStart') }}
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
          {{ t('about.readySubtitle') }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link to="/properties" class="btn-primary">{{
            t('about.browseProperties')
          }}</router-link>
          <router-link to="/contact" class="btn-secondary">{{
            t('about.contactToday')
          }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  ShieldCheckIcon,
  StarIcon,
  UserGroupIcon,
  LightBulbIcon,
  EnvelopeIcon,
} from '@heroicons/vue/24/outline'

const { t, locale } = useI18n()

const teamMembers = computed(() => [
  {
    name: locale.value === 'th' ? 'คุณสุนิสา ปัญญาดี' : 'Sunisa Panyadee',
    position: locale.value === 'th' ? 'ผู้จัดการฝ่ายขาย' : 'Sales Manager',
    bio:
      locale.value === 'th'
        ? 'มีประสบการณ์ด้านอสังหาริมทรัพย์หรูมากกว่า 8 ปี เชี่ยวชาญในอสังหาริมทรัพย์ระดับไฮเอนด์และโอกาสการลงทุน'
        : 'With over 8 years of experience in luxury real estate, specializing in high-end residential properties and investment opportunities.',
    image:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: locale.value === 'th' ? 'คุณวิชัย ธนาวัฒน์' : 'Wichai Thanawat',
    position:
      locale.value === 'th'
        ? 'ผู้เชี่ยวชาญอสังหาริมทรัพย์เชิงพาณิชย์'
        : 'Commercial Property Specialist',
    bio:
      locale.value === 'th'
        ? 'นำประสบการณ์ด้านอสังหาริมทรัพย์เชิงพาณิชย์มากกว่า 12 ปี ช่วยธุรกิจต่างๆ หาพื้นที่ที่เหมาะสมสำหรับการเติบโตและความสำเร็จ'
        : 'Brings over 12 years of commercial real estate expertise, helping businesses find the perfect spaces for growth and success.',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: locale.value === 'th' ? 'คุณมาลี ใจดี' : 'Malee Jaidee',
    position:
      locale.value === 'th' ? 'ผู้เชี่ยวชาญลูกค้าซื้อครั้งแรก' : 'First-Time Buyer Specialist',
    bio:
      locale.value === 'th'
        ? 'มีความหลงใหลในการช่วยเหลือผู้ซื้อครั้งแรกให้สามารถเดินทางในตลาดอสังหาริมทรัพย์ด้วยความมั่นใจและค้นหาบ้านในฝันของพวกเขา'
        : 'Passionate about helping first-time buyers navigate the real estate market with confidence and find their dream homes.',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
  },
])
</script>
