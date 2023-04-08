import { test, expect } from 'vitest'
import { splitPath } from './split-path'

test('splitPath', () => {
  expect(splitPath('')).toEqual([null, ''])
  expect(splitPath('test')).toEqual([null, 'test'])
  expect(splitPath('test.mkv')).toEqual([null, 'test.mkv'])
  expect(splitPath("S01E01 I'm.an.engineer.avi")).toEqual([null, "S01E01 I'm.an.engineer.avi"])
  expect(splitPath("Season 1/S01E01 I'm.an.engineer.avi")).toEqual(['Season 1', "S01E01 I'm.an.engineer.avi"])
  expect(splitPath('Best Series/Season 1/S01E01.mp4')).toEqual(['Best Series/Season 1', 'S01E01.mp4'])
})
