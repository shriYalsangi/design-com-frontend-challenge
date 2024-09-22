<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useHCardStore } from '@/stores/hcard'
import PlaceholderImage from '@/assets/placeholder-avatar.png'

const hcardStore = useHCardStore()
const hcard = hcardStore.hcard
const hCardPreviewRef = ref<HTMLDivElement | null>(null)

const fullName = computed<string>(() => {
  const { givenName, surname } = hcard
  return [givenName, surname].filter(Boolean).join(' ') || ''
})

const addressLine1 = computed<string>(() => {
  const { houseNumber, street } = hcard
  return [houseNumber, street].filter(Boolean).join(' ') || ''
})

const addressLine2 = computed<string>(() => {
  const { suburb, state } = hcard
  return [suburb, state].filter(Boolean).join(', ') || ''
})

onMounted(() => {
  hcardStore.setPreviewRef(hCardPreviewRef.value)
})
</script>

<template>
  <div
    id="hCardPreview"
    ref="hCardPreviewRef"
    class="bg-white shadow-lg rounded-lg overflow-hidden w-96 mx-auto"
  >
    <div class="bg-slate-700 text-white p-4 h-20 flex items-center">
      <div class="flex-grow min-w-0">
        <h2 class="text-2xl font-bold break-words" data-testid="fullName">{{ fullName }}</h2>
      </div>
      <div class="flex-shrink-0">
        <img
          :src="typeof hcard.avatar === 'string' ? hcard.avatar : PlaceholderImage"
          alt="Avatar"
          class="w-16 h-16 rounded-sm object-cover"
        />
      </div>
    </div>
    <div class="p-4 relative">
      <div class="space-y-2 text-xs">
        <div class="flex border-b border-gray-200 pb-1">
          <span class="text-gray-500 w-20">EMAIL</span>
          <span class="flex-grow" data-testid="email">{{ hcard.email }}</span>
        </div>
        <div class="flex border-b border-gray-200 pb-1">
          <span class="text-gray-500 w-20">PHONE</span>
          <span class="flex-grow" data-testid="phone">{{ hcard.phone }}</span>
        </div>
        <div class="flex border-b border-gray-200 pb-1">
          <span class="text-gray-500 w-20 mb-1">ADDRESS</span>
          <span class="flex-grow" data-testid="addressLine1">{{ addressLine1 || '\u00A0' }}</span>
        </div>
        <div class="flex border-b border-gray-200 pb-1">
          <span class="w-20"></span>
          <span class="flex-grow" data-testid="addressLine2">{{ addressLine2 || '\u00A0' }}</span>
        </div>
        <div class="flex border-b border-gray-200 pb-1">
          <span class="text-gray-500 w-20">POSTCODE</span>
          <span class="flex-grow" data-testid="postcode">{{ hcard.postcode }}</span>
          <span class="text-gray-500 w-20">COUNTRY</span>
          <span class="flex-grow" data-testid="country">{{ hcard.country }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
