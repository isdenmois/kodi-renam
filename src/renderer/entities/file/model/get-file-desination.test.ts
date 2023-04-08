import type { QFile } from 'shared/api'
import { test, expect } from 'vitest'
import { getFileDestination } from './get-file-destination'

test('test', () => {
  expect(
    getFileDestination(
      {
        title: 'S01E01 pilot.srt',
        directory: 'best series ever',
        season: 1,
        filename: '1.srt',
      } as QFile,
      'The best series ever',
    ),
  ).toBe('best series ever/S01E01 pilot.srt')

  expect(
    getFileDestination(
      {
        title: 'S01E02 the second.srt',
        directory: 'best series ever/subtitles',
        season: 1,
        filename: '2.srt',
      } as QFile,
      'The best series ever',
    ),
  ).toBe('best series ever/subtitles/S01E02 the second.srt')

  expect(
    getFileDestination(
      {
        title: 'S01E01 pilot.mp4',
        directory: 'best series ever',
        season: 1,
        filename: '1.mp4',
      } as QFile,
      'The best series ever',
    ),
  ).toBe('The best series ever/Season 1/S01E01 pilot.mp4')

  expect(
    getFileDestination(
      {
        title: 'S10E12 finale.mp4',
        directory: 'best series ever',
        season: 10,
        filename: '12.mp4',
      } as QFile,
      'The best series ever',
    ),
  ).toBe('The best series ever/Season 10/S10E12 finale.mp4')
})
