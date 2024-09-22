import { createTestingPinia } from '@pinia/testing'
import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { useHCardStore } from '@/stores/hcard'
import AvatarUpload from '@/components/AvatarUpload.vue'
import HCardDownload from '@/components/HCardDownload.vue'
import HCardForm from '@/components/HCardForm.vue'

describe('HCardForm.vue', () => {
  const mountComponent = () => {
    return mount(HCardForm, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    })
  }

  it('renders the form fields correctly', () => {
    const wrapper = mountComponent()

    const fields = [
      'givenName',
      'surname',
      'email',
      'phone',
      'houseNumber',
      'street',
      'suburb',
      'state',
      'postcode',
      'country',
    ]

    fields.forEach((field) => {
      expect(wrapper.find(`input#${field}`).exists()).toBe(true)
    })
  })

  it('binds v-model correctly to the inputs', async () => {
    const wrapper = mountComponent()
    const hcardStore = useHCardStore()

    const emailInput = wrapper.find('input#email')
    await emailInput.setValue('test@example.com')

    expect(hcardStore.hcard.email).toBe('test@example.com')

    const phoneInput = wrapper.find('input#phone')
    await phoneInput.setValue('+123456789')

    expect(hcardStore.hcard.phone).toBe('+123456789')
  })

  it('validates email input correctly', async () => {
    const wrapper = mountComponent()
    const hcardStore = useHCardStore()

    const emailInput = wrapper.find('input#email')
    await emailInput.setValue('invalidemail')

    // Mocking the getter using Object.defineProperty
    Object.defineProperty(hcardStore, 'showFieldError', {
      value: () => true,
      configurable: true,
    })

    expect(wrapper.find('[data-testid="error-message-email"]').exists()).toBe(true)
  })

  it('validates phone input correctly', async () => {
    const wrapper = mountComponent()
    const hcardStore = useHCardStore()

    const phoneInput = wrapper.find('input#phone')
    await phoneInput.setValue('123abc')

    // Mocking the getter using Object.defineProperty
    Object.defineProperty(hcardStore, 'showFieldError', {
      value: () => true,
      configurable: true,
    })

    // The value should be sanitized to only contain valid characters
    expect(hcardStore.hcard.phone).toBe('123')
    expect(wrapper.find('[data-testid="error-message-phone"]').exists()).toBe(true)
  })

  it('calls the updateAvatar method when a file is uploaded', async () => {
    const wrapper = mountComponent()
    const hcardStore = useHCardStore()

    const mockFile = new File([''], 'avatar.png', { type: 'image/png' })
    const avatarUpload = wrapper.findComponent(AvatarUpload)
    await avatarUpload.vm.$emit('upload', mockFile)

    expect(hcardStore.updateAvatar).toHaveBeenCalledWith(mockFile)
  })

  it('renders HCardDownload component', () => {
    const wrapper = mountComponent()

    expect(wrapper.findComponent(HCardDownload).exists()).toBe(true)
  })
})
