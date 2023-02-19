import { afterEach, describe, expect, test, vi } from 'vitest'
import { get, set } from './storage'

const { ipcRenderer } = window.electron

vi.spyOn(ipcRenderer, 'invoke').mockResolvedValue({ token: 'test' })

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
