import { createTestingPinia } from '@pinia/testing'
import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { useHCardStore } from '@/stores/hcard'
import HCardPreview from '@/components/HCardPreview.vue'
import PlaceholderImage from '@/assets/placeholder-avatar.png'

describe('HCardPreview.vue', () => {
  const mountComponent = () => {
    return mount(HCardPreview, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    })
  }

  global.URL.createObjectURL = vi.fn()

  it('renders full name correctly', async () => {
    const wrapper = mountComponent()
    const hcardStore = useHCardStore()

    hcardStore.hcard.givenName = 'John'
    hcardStore.hcard.surname = 'Doe'

    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-testid="fullName"]').text()).toBe('John Doe')
  })

  it('renders email and phone correctly', async () => {
    const wrapper = mountComponent()
    const hcardStore = useHCardStore()

    hcardStore.hcard.email = 'john.doe@example.com'
    hcardStore.hcard.phone = '+123456789'

    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-testid="email"]').text()).toBe('john.doe@example.com')
    expect(wrapper.find('[data-testid="phone"]').text()).toBe('+123456789')
  })

  it('renders address line 1 and line 2 correctly', async () => {
    const wrapper = mountComponent()
    const hcardStore = useHCardStore()

    hcardStore.hcard.houseNumber = '123'
    hcardStore.hcard.street = 'Main St'
    hcardStore.hcard.suburb = 'Springfield'
    hcardStore.hcard.state = 'IL'

    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-testid="addressLine1"]').text()).toBe('123 Main St')
    expect(wrapper.find('[data-testid="addressLine2"]').text()).toBe('Springfield, IL')
  })

  it('renders postcode and country correctly', async () => {
    const wrapper = mountComponent()
    const hcardStore = useHCardStore()

    hcardStore.hcard.postcode = '12345'
    hcardStore.hcard.country = 'USA'

    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-testid="postcode"]').text()).toBe('12345')
    expect(wrapper.find('[data-testid="country"]').text()).toBe('USA')
  })

  it('renders placeholder image if avatar URL is missing', () => {
    const wrapper = mountComponent()
    const hcardStore = useHCardStore()

    hcardStore.hcard.avatar = null

    expect(wrapper.find('img').attributes('src')).toBe(PlaceholderImage)
  })
})
