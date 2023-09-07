import { describe, vi, it, expect } from 'vitest'
import { storage } from 'shared/lib'
import { settings$, loadSettings, updateSettings } from './settings'

describe('settings', () => {
  it('should update settings when updateSettings is called', () => {
    const newSettings = { port: 8080, token: 'newToken' }

    vi.spyOn(storage, 'set')

    updateSettings(newSettings)

    expect(settings$.get()).toEqual(newSettings)
    expect(storage.set).toHaveBeenCalledWith('settings', newSettings)
  })

  it('should load valid settings from storage', async () => {
    const storedSettings = { port: 8080, token: 'storedToken' }

    vi.spyOn(storage, 'get').mockResolvedValue(storedSettings)

    await loadSettings()

    expect(settings$.get()).toEqual(storedSettings)
  })

  it('should not load invalid settings from storage', async () => {
    const invalidSettings = { port: 'invalid', token: 'invalidToken' }

    vi.spyOn(storage, 'get').mockResolvedValue(invalidSettings)

    await loadSettings()

    expect(settings$.get()).not.toEqual(invalidSettings)
  })
})
