import { describe, it, expect, afterAll } from 'vitest'
import type { QFile } from 'shared/api'
import { files$, season$, seriesFiles$ } from './files'

describe('seriesFiles$', () => {
  afterAll(() => files$.set([]))

  it('should filter out unsupported files', async () => {
    files$.set([
      { filename: 'file.mkv', episode: 1, season: 1 } as QFile,
      { filename: 'file.srt', episode: 1, season: 1 } as QFile,
      { filename: 'file.txt', episode: 1, season: 1 } as QFile,
      { filename: 'file....', episode: 1, season: 1 } as QFile,
      { filename: 'file.', episode: 1, season: 1 } as QFile,
    ])

    expect(seriesFiles$.get()).toEqual([
      { filename: 'file.mkv', episode: 1, season: 1 },
      { filename: 'file.srt', episode: 1, season: 1 },
    ])
  })

  it('should filter out weird episodes and seasons numbers', () => {
    files$.set([
      { filename: 'file.mkv', episode: -1, season: 1 } as QFile,
      { filename: 'file.mkv', episode: 0, season: 1 } as QFile,
      { filename: 'file.mkv', episode: 1, season: -1 } as QFile,
      { filename: 'file.mkv', episode: 1, season: 0 } as QFile,
      { filename: 'file.mkv', episode: 1, season: 1 } as QFile,
    ])

    expect(seriesFiles$.get()).toEqual([{ filename: 'file.mkv', episode: 1, season: 1 }])
  })

  it('should be sorted by episode', () => {
    files$.set([
      { filename: 'file2.avi', episode: 2, season: 1 } as QFile,
      { filename: 'file4.avi', episode: 4, season: 1 } as QFile,
      { filename: 'file1.avi', episode: 1, season: 1 } as QFile,
      { filename: 'file3.avi', episode: 3, season: 1 } as QFile,
    ])

    expect(seriesFiles$.get()).toEqual([
      { filename: 'file1.avi', episode: 1, season: 1 },
      { filename: 'file2.avi', episode: 2, season: 1 },
      { filename: 'file3.avi', episode: 3, season: 1 },
      { filename: 'file4.avi', episode: 4, season: 1 },
    ])
  })
})

describe('season$', () => {
  afterAll(() => files$.set([]))

  it('should return the season of the first series file', () => {
    files$.set([
      { filename: 'file1.mkv', episode: 1, season: 2 } as QFile,
      { filename: 'file2.mkv', episode: 2, season: 2 } as QFile,
    ])

    expect(season$.get()).toBe(2)
  })

  it('should return 0 if there are no series files', () => {
    files$.set([])

    expect(season$.get()).toBe(0)
  })
})
