import { test, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/svelte'
import [FTName | pascalcase] from '../[FTName | pascalcase].svelte'

test('[FTName | pascalcase]', async () => {
  render([FTName | pascalcase])
  expect(screen.getByText('0')).toBeInTheDocument()

  await fireEvent.click(screen.getByText('++'))
  expect(screen.getByText('1')).toBeInTheDocument()

  await fireEvent.click(screen.getByText('--'))
  expect(screen.getByText('0')).toBeInTheDocument()
})
