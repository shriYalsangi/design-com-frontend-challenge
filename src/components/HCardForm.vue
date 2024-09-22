<script setup lang="ts">
import { useHCardStore } from '@/stores/hcard'
import AvatarUpload from '@/components/AvatarUpload.vue'
import HCardDownload from '@/components/HCardDownload.vue'

const hcardStore = useHCardStore()
const hcard = hcardStore.hcard

const updateAvatar = (file: File) => {
  hcardStore.updateAvatar(file)
}

const handleInput = (field: string) => {
  hcardStore.setTouched(field)
}

const handlePhoneInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  // Allow only +, digits, and spaces
  let value = input.value.replace(/[^\d\s+]/g, '')
  // Ensure + is only at the beginning
  value = value.replace(/^\+?|\+/g, (match) => (match === '+' ? '+' : ''))
  // Update the input value
  hcard.phone = value
  handleInput('phone')
}
</script>

<template>
  <form @submit.prevent class="space-y-8">
    <div>
      <h3 class="text-sm font-semibold text-gray-400 uppercase">Personal Details</h3>
      <div class="border-b border-gray-400 mb-4"></div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="givenName" class="block text-sm font-medium text-gray-600">GIVEN NAME</label>
          <input
            id="givenName"
            name="givenName"
            v-model="hcard.givenName"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 h-10"
          />
        </div>
        <div>
          <label for="surname" class="block text-sm font-medium text-gray-600">SURNAME</label>
          <input
            id="surname"
            name="surname"
            v-model="hcard.surname"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 h-10"
          />
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-600">EMAIL</label>
          <input
            id="email"
            name="email"
            v-model="hcard.email"
            @input="handleInput('email')"
            type="email"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 h-10"
            :class="{ 'border-red-500 focus:border-red-500': hcardStore.showFieldError('email') }"
          />
          <p
            v-if="hcardStore.showFieldError('email')"
            data-testid="error-message-email"
            class="mt-1 text-xs text-red-600"
          >
            Please enter a valid email address.
          </p>
        </div>
        <div>
          <label for="phone" class="block text-sm font-medium text-gray-600">PHONE</label>
          <input
            id="phone"
            name="phone"
            v-model="hcard.phone"
            @input="handlePhoneInput"
            type="tel"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 h-10"
            :class="{ 'border-red-500 focus:border-red-500': hcardStore.showFieldError('phone') }"
          />
          <p
            v-if="hcardStore.showFieldError('phone')"
            data-testid="error-message-phone"
            class="mt-1 text-xs text-red-600"
          >
            Please enter a valid phone number (7-15 digits, spaces allowed).
          </p>
        </div>
      </div>
    </div>

    <div>
      <h3 class="text-sm font-semibold text-gray-400 uppercase">Address</h3>
      <div class="border-b border-gray-400 mb-4"></div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="houseNumber" class="block text-sm font-medium text-gray-600"
            >HOUSE NAME OR #</label
          >
          <input
            id="houseNumber"
            name="houseNumber"
            v-model="hcard.houseNumber"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 h-10"
          />
        </div>
        <div>
          <label for="street" class="block text-sm font-medium text-gray-600">STREET</label>
          <input
            id="street"
            name="street"
            v-model="hcard.street"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 h-10"
          />
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label for="suburb" class="block text-sm font-medium text-gray-600">SUBURB</label>
          <input
            id="suburb"
            name="suburb"
            v-model="hcard.suburb"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 h-10"
          />
        </div>
        <div>
          <label for="state" class="block text-sm font-medium text-gray-600">STATE</label>
          <input
            id="state"
            name="state"
            v-model="hcard.state"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 h-10"
          />
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label for="postcode" class="block text-sm font-medium text-gray-600">POSTCODE</label>
          <input
            id="postcode"
            name="postcode"
            v-model="hcard.postcode"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 h-10"
          />
        </div>
        <div>
          <label for="country" class="block text-sm font-medium text-gray-600">COUNTRY</label>
          <input
            id="country"
            name="country"
            v-model="hcard.country"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 h-10"
          />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <AvatarUpload @upload="updateAvatar" />
      <HCardDownload />
    </div>
  </form>
</template>
