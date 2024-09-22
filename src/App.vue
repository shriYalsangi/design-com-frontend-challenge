<script setup lang="ts">
import HCardForm from '@/components/HCardForm.vue'
import HCardPreview from '@/components/HCardPreview.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold text-blue-600 mb-8 text-center">hCard Builder</h1>
      <div class="bg-white shadow-xl rounded-lg overflow-hidden">
        <div class="grid grid-cols-1 md:grid-cols-2">
          <div class="p-6 bg-gray-50">
            <HCardForm />
          </div>
          <div class="p-6 flex items-center justify-center bg-gray-200">
            <div>
              <HCardPreview />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
