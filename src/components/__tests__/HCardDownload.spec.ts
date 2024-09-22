import { createTestingPinia } from '@pinia/testing'
import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import HCardDownload from '@/components/HCardDownload.vue'

// Mock html-to-image for testing
vi.mock('html-to-image', () => ({
  toPng: vi.fn().mockReturnValue(Promise.resolve('data:image/png;base64,test=')),
}))

describe('HCardDownload.vue', () => {
  const mountComponent = () => {
    const pinia = createTestingPinia()

    return mount(HCardDownload, {
      global: {
        plugins: [pinia],
      },
    })
  }

  it('triggers download link click on button click', async () => {
    const wrapper = mountComponent()
    const button = wrapper.find('button')

    button.trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-testid="download-link"]').exists()).toBe(true)
  })
})
