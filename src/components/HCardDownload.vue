<script setup lang="ts">
import { ref } from 'vue'
import { toPng } from 'html-to-image'
import { useHCardStore } from '@/stores/hcard'
import { useToast } from 'vue-toastification'

const hcardStore = useHCardStore()
const fileName = ref('hCard.png')

const triggerFileDownload = (): void => {
  const hCardPreviewElement = hcardStore.previewRef

  if (hCardPreviewElement) {
    toPng(hCardPreviewElement)
      .then((dataUrl: string) => {
        const link = document.createElement('a')
        link.href = dataUrl
        link.download = fileName.value
        link.setAttribute('data-testid', 'download-link')
        link.click()
      })
      .catch((error: Error) => {
        const toast = useToast()
        toast.error(`Error generating image:: ${error}`)
      })
  }
}
</script>

<template>
  <div class="grid grid-cols-1">
    <button
      data-testid="download-link"
      @click="triggerFileDownload"
      class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
    >
      Download hCard
    </button>
  </div>
</template>
