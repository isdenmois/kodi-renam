import { afterEach, describe, expect, test, vi } from 'vitest'
import { ipcRenderer } from 'electron'
import { get, set } from './storage'

vi.mock('electron', () => {
  const ipcRenderer = {
    invoke: vi.fn(() => Promise.resolve({ token: 'test' })),
  }

  return { ipcRenderer }
})

describe('Storage', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  test('get', async () => {
    expect(await get('token')).toEqual({ token: 'test' })
    expect(ipcRenderer.invoke).toHaveBeenCalledWith('storage/get', 'token')
  })

  test('set', async () => {
    await set('token', { token: 'whoa' })

    expect(ipcRenderer.invoke).toHaveBeenCalledWith('storage/set', 'token', { token: 'whoa' })
  })
})
