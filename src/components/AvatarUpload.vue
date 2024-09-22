<script setup lang="ts">
import { type Ref, ref } from 'vue'
import { useToast } from 'vue-toastification'

const emit = defineEmits(['upload'])
const fileInput: Ref<HTMLInputElement | null> = ref(null)

const triggerFileInput = (): void => {
  if (!fileInput.value) return

  fileInput.value.click()
}

const handleFileUpload = (event: Event): void => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e: ProgressEvent<FileReader>) => {
      emit('upload', e.target?.result || null)
    }
    reader.onerror = () => {
      const toast = useToast()
      toast.error(`Error reading file, ${reader.error}`)
    }
    reader.readAsDataURL(file)
  }
}
</script>

<template>
  <div class="grid grid-cols-1">
    <button
      @click="triggerFileInput"
      data-testid="file-upload"
      class="bg-slate-500 text-white px-4 py-2 rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50"
    >
      Upload Avatar
    </button>
    <input type="file" ref="fileInput" accept="image/*" @change="handleFileUpload" class="hidden" />
  </div>
</template>
