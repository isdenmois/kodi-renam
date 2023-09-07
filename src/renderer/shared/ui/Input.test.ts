import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/svelte'
import Input from './Input.svelte'

describe('Input component', () => {
  it('renders input correctly', async () => {
    const { getByLabelText } = render(Input, {
      props: {
        label: 'Test Label',
        placeholder: 'Test Placeholder',
        value: 'Test Value',
      },
    })

    const input = getByLabelText('Test Label') as HTMLInputElement
    expect(input.placeholder).toBe('Test Placeholder')
    expect(input.value).toBe('Test Value')
  })

  it('updates value on input', async () => {
    const { getByLabelText } = render(Input, {
      props: {
        label: 'Test Label',
        placeholder: 'Test Placeholder',
        value: 'Test Value',
      },
    })

    const input = getByLabelText('Test Label') as HTMLInputElement
    await fireEvent.input(input, { target: { value: 'New Value' } })

    expect(input.value).toBe('New Value')
  })
})
