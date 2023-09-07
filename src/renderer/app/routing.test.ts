import { describe, it, expect, afterEach } from 'vitest'
import { selectedSeries$ } from 'entities/series'
import { selectedFolder$ } from 'entities/folder'
import { episodes$ } from 'entities/episode'
import { isSettingsOpened$ } from 'entities/settings'
import { files$ } from 'features/rename'
import { route$ } from './routing'
import type { Episode, Folder, QFile } from 'shared/api'

describe('routing', () => {
  afterEach(() => {
    isSettingsOpened$.set(false)
    selectedFolder$.set(null)
    selectedSeries$.set(null)
    files$.set([])
    episodes$.set([])
  })

  it('returns SETTINGS when isSettingsOpened', () => {
    isSettingsOpened$.set(true)
    expect(route$.get()).toBe('SETTINGS')
  })

  it('returns LOADING when selectedFolder is true and files are empty', () => {
    selectedFolder$.set({} as Folder)
    files$.set([])
    episodes$.set([{} as Episode])
    expect(route$.get()).toBe('LOADING')
  })

  it('returns LOADING when selectedFolder is true and episodes are empty', () => {
    selectedFolder$.set({} as Folder)
    files$.set([{} as QFile])
    episodes$.set([])
    expect(route$.get()).toBe('LOADING')
  })

  it('returns RENAMER when selectedFolder is true and files and episodes are not empty', () => {
    selectedFolder$.set({} as Folder)
    files$.set([{} as QFile])
    episodes$.set([{} as Episode])
    expect(route$.get()).toBe('RENAMER')
  })

  it('returns FOLDER_SELECT when selectedSeries is true', () => {
    selectedSeries$.set({})
    expect(route$.get()).toBe('FOLDER_SELECT')
  })

  it('else it should be HOME', () => {
    expect(route$.get()).toBe('HOME')
  })
})
