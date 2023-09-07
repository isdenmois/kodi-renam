import { describe, it, expect } from 'vitest'
import { openSettings, isSettingsOpened$, closeSettings } from './is-opened'

describe('isSettingsOpened$', () => {
  it('should set isSettingsOpened$ to true when openSettings is called', () => {
    openSettings()
    expect(isSettingsOpened$.get()).toBe(true)
  })

  it('should set isSettingsOpened$ to false when closeSettings is called', () => {
    closeSettings()
    expect(isSettingsOpened$.get()).toBe(false)
  })
})
