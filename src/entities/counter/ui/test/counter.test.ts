import { test, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/svelte'
import { env } from 'shared/lib'
import Counter from '../Counter.svelte'

test('Counter', async () => {
  const initial = String(env.counterInitial)
  const incremented = String(env.counterInitial + 1)

  render(Counter)
  expect(screen.getByText(initial)).toBeInTheDocument()

  await fireEvent.click(screen.getByText('++'))
  expect(screen.getByText(incremented)).toBeInTheDocument()

  await fireEvent.click(screen.getByText('--'))
  expect(screen.getByText(initial)).toBeInTheDocument()
})
