import { expect } from 'vitest'
import matchers from '@testing-library/jest-dom/matchers'
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Vi {
    interface JestAssertion<T> extends jest.Matchers<void, T>, TestingLibraryMatchers<T, void> {}
  }
}

window.electron = {
  ipcRenderer: {
    invoke: () => null,
  },
}

expect.extend(matchers)
