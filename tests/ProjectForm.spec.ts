import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ProjectForm from '~/components/project/ProjectForm.vue'

const createWrapper = () => mount(ProjectForm, {
  props: {
    submitLabel: 'Mentés',
  },
  global: {
    stubs: {
      Label: {
        template: '<label><slot /></label>',
      },
      Input: {
        inheritAttrs: false,
        template: '<input v-bind="$attrs" />',
      },
      Textarea: {
        inheritAttrs: false,
        template: '<textarea v-bind="$attrs" />',
      },
      Button: {
        inheritAttrs: false,
        template: '<button v-bind="$attrs"><slot /></button>',
      },
      Popover: {
        template: '<div><slot /></div>',
      },
      PopoverTrigger: {
        template: '<div><slot /></div>',
      },
      PopoverContent: {
        template: '<div><slot /></div>',
      },
      Calendar: {
        template: '<div />',
      },
    },
  },
})

describe('ProjectForm', () => {
  it('shows validation errors when submitting an empty form', async () => {
    const wrapper = createWrapper()

    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    expect(wrapper.text()).toContain(
      'A projekt neve legalább 3 karakter és kötelező.',
    )
    expect(wrapper.text()).toContain(
      'A leírás legalább 10 karakter és kötelező.',
    )
    expect(wrapper.text()).toContain(
      'A kezdési dátum megadása kötelező.',
    )
    expect(wrapper.text()).toContain(
      'A költségvetés legalább 1 Ft és kötelező.',
    )
  })

  it('shows an error when the project name is too short', async () => {
    const wrapper = createWrapper()

    await wrapper.find('#name').setValue('AB')
    await wrapper.find('#description').setValue(
      'Ez egy megfelelő hosszúságú leírás.',
    )
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    expect(wrapper.text()).toContain(
      'A projekt neve legalább 3 karakter és kötelező.',
    )
  })

  it('shows an error when the description is too short', async () => {
    const wrapper = createWrapper()

    await wrapper.find('#name').setValue('Projekt')
    await wrapper.find('#description').setValue('Rövid')
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    expect(wrapper.text()).toContain(
      'A leírás legalább 10 karakter és kötelező.',
    )
  })

  it('shows an error when the budget is zero or negative', async () => {
    const wrapper = createWrapper()

    await wrapper.find('#name').setValue('Projekt')
    await wrapper.find('#description').setValue(
      'Ez egy megfelelő hosszúságú leírás.',
    )
    await wrapper.find('#budget').setValue('0')
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    expect(wrapper.text()).toContain(
      'A költségvetés legalább 1 Ft és kötelező.',
    )
  })
})