import { atom } from 'nanostores'

export const isSettingsOpened$ = atom(false)

export function openSettings() {
  isSettingsOpened$.set(true)
}

export function closeSettings() {
  isSettingsOpened$.set(false)
}
