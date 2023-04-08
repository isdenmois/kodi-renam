import { test, expect } from 'vitest'
import { splitFilename } from './split-filename'

test('splitFilename', () => {
  expect(splitFilename('')).toEqual(['', ''])
  expect(splitFilename('test')).toEqual(['test', ''])
  expect(splitFilename('test.mkv')).toEqual(['test', 'mkv'])
  expect(splitFilename('hello.txt')).toEqual(['hello', 'txt'])
  expect(splitFilename("S01E01 I'm.an.engineer.avi")).toEqual(["S01E01 I'm.an.engineer", 'avi'])
})
