import { defineStore } from 'pinia'
import { validateEmail, validatePhone } from '@/utils/validate-inputs'

export interface HCard {
  givenName: string
  surname: string
  email: string
  phone: string
  houseNumber: string
  street: string
  suburb: string
  state: string
  postcode: string
  country: string
  avatar: File | null
}

interface TouchedFields {
  [key: string]: boolean
}

interface HCardState {
  hcard: HCard
  touched: TouchedFields
  previewRef: HTMLElement | null
}

export const useHCardStore = defineStore('hcard', {
  state: (): HCardState => ({
    hcard: {
      givenName: '',
      surname: '',
      email: '',
      phone: '',
      houseNumber: '',
      street: '',
      suburb: '',
      state: '',
      postcode: '',
      country: '',
      avatar: null,
    },
    touched: {
      email: false,
      phone: false,
    },
    previewRef: null,
  }),
  getters: {
    isEmailValid(): boolean {
      return validateEmail(this.hcard.email)
    },
    isPhoneValid(): boolean {
      return validatePhone(this.hcard.phone)
    },
    showFieldError(): (field: string) => boolean {
      return (field: string) => {
        if (!this.touched[field]) return false
        if (field === 'email') return !this.isEmailValid
        if (field === 'phone') return !this.isPhoneValid
        return this.hcard[field as keyof HCard] === ''
      }
    },
  },
  actions: {
    updateAvatar(file: File): void {
      this.hcard.avatar = file
    },
    setTouched(field: string): void {
      this.touched[field] = true
    },
    setPreviewRef(ref: HTMLElement | null): void {
      this.previewRef = ref
    },
  },
})
