<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h3 class="text-lg font-semibold text-gray-900 mb-4">Contact Agent</h3>
    
    <!-- Agent Info -->
    <div class="flex items-center space-x-3 mb-6">
      <img
        :src="agent.avatar || '/default-avatar.png'"
        :alt="agent.name"
        class="w-12 h-12 rounded-full object-cover"
      />
      <div>
        <h4 class="font-medium text-gray-900">{{ agent.name }}</h4>
        <p class="text-sm text-gray-600">{{ agent.email }}</p>
        <p class="text-sm text-gray-600">{{ agent.phone }}</p>
      </div>
    </div>

    <!-- Contact Form -->
    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
          Full Name *
        </label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          required
          class="input-field"
          :class="{ 'border-red-500': errors.name }"
        />
        <p v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name }}</p>
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
          Email *
        </label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          required
          class="input-field"
          :class="{ 'border-red-500': errors.email }"
        />
        <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</p>
      </div>

      <div>
        <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">
          Phone
        </label>
        <input
          id="phone"
          v-model="form.phone"
          type="tel"
          class="input-field"
        />
      </div>

      <div>
        <label for="message" class="block text-sm font-medium text-gray-700 mb-1">
          Message *
        </label>
        <textarea
          id="message"
          v-model="form.message"
          rows="4"
          required
          class="input-field resize-none"
          :class="{ 'border-red-500': errors.message }"
          :placeholder="`I'm interested in ${propertyTitle}. Please contact me with more information.`"
        ></textarea>
        <p v-if="errors.message" class="text-red-500 text-xs mt-1">{{ errors.message }}</p>
      </div>

      <button
        type="submit"
        :disabled="isSubmitting"
        class="w-full btn-primary"
        :class="{ 'opacity-50 cursor-not-allowed': isSubmitting }"
      >
        <span v-if="isSubmitting">Sending...</span>
        <span v-else>Send Message</span>
      </button>
    </form>

    <!-- Success Message -->
    <div v-if="showSuccess" class="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
      <p class="text-green-800 text-sm">
        Your message has been sent successfully! The agent will contact you soon.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { Agent } from '@/types/property'

interface Props {
  agent: Agent
  propertyTitle: string
}

const props = defineProps<Props>()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const errors = reactive({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const showSuccess = ref(false)

const validateForm = (): boolean => {
  // Reset errors
  errors.name = ''
  errors.email = ''
  errors.message = ''

  let isValid = true

  if (!form.name.trim()) {
    errors.name = 'Name is required'
    isValid = false
  }

  if (!form.email.trim()) {
    errors.email = 'Email is required'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address'
    isValid = false
  }

  if (!form.message.trim()) {
    errors.message = 'Message is required'
    isValid = false
  }

  return isValid
}

const submitForm = async () => {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Reset form
    form.name = ''
    form.email = ''
    form.phone = ''
    form.message = ''
    
    showSuccess.value = true
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      showSuccess.value = false
    }, 5000)
    
  } catch (error) {
    console.error('Error sending message:', error)
    // Handle error (could show error toast)
  } finally {
    isSubmitting.value = false
  }
}
</script>
