<template>
  <div class="space-y-4">
    <!-- Main Image -->
    <div class="relative">
      <img
        :src="images[currentImageIndex]"
        :alt="`Property image ${currentImageIndex + 1}`"
        class="w-full h-96 object-cover rounded-lg"
      />
      
      <!-- Navigation Arrows -->
      <button
        v-if="images.length > 1"
        @click="previousImage"
        class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
      >
        <ChevronLeftIcon class="w-6 h-6" />
      </button>
      
      <button
        v-if="images.length > 1"
        @click="nextImage"
        class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
      >
        <ChevronRightIcon class="w-6 h-6" />
      </button>

      <!-- Image Counter -->
      <div class="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
        {{ currentImageIndex + 1 }} / {{ images.length }}
      </div>
    </div>

    <!-- Thumbnail Strip -->
    <div v-if="images.length > 1" class="flex space-x-2 overflow-x-auto pb-2">
      <button
        v-for="(image, index) in images"
        :key="index"
        @click="currentImageIndex = index"
        :class="[
          'flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors',
          index === currentImageIndex ? 'border-primary-600' : 'border-gray-200 hover:border-gray-300'
        ]"
      >
        <img
          :src="image"
          :alt="`Thumbnail ${index + 1}`"
          class="w-full h-full object-cover"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'

interface Props {
  images: string[]
}

const props = defineProps<Props>()

const currentImageIndex = ref(0)

const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % props.images.length
}

const previousImage = () => {
  currentImageIndex.value = currentImageIndex.value === 0 
    ? props.images.length - 1 
    : currentImageIndex.value - 1
}
</script>
