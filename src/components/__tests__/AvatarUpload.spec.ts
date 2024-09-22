import { createTestingPinia } from '@pinia/testing'
import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import AvatarUpload from '@/components/AvatarUpload.vue'

vi.mock('vue-toastification')

describe('AvatarUpload', () => {
  const mountComponent = () => {
    return mount(AvatarUpload, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    })
  }

  it('renders the upload button', () => {
    const wrapper = mountComponent()
    const button = wrapper.find('button[data-testid="file-upload"]')
    expect(button.exists()).toBe(true)
    expect(button.text()).toBe('Upload Avatar')
  })

  it('triggers file input click on button click', async () => {
    const wrapper = mountComponent()
    const button = wrapper.find('[data-testid="file-upload"]')

    button.trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$refs.fileInput).toBeTruthy()
  })
})
