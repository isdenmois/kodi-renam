import { describe, it, expect } from 'vitest'
import { getFileName } from './get-filename'

describe('getFileName', () => {
  it('should work', () => {
    expect(getFileName('')).toBe('')
    expect(getFileName('test.avi')).toBe('test.avi')
  })

  it('should replace slashes with dashes', () => {
    expect(getFileName('S11E05 they/them and she/her.mkv')).toBe('S11E05 they-them and she-her.mkv')
  })

  it('should cut special characters off', () => {
    expect(getFileName('S01E01 are you, dad?.avi')).toBe('S01E01 are you, dad.avi')
    expect(getFileName('S01E01 I <3 you.avi')).toBe('S01E01 I 3 you.avi')
    expect(getFileName('S01E01 mission: accomplished.srt')).toBe('S01E01 mission accomplished.srt')
  })

  it('should cut long filenames', () => {
    expect(
      getFileName(
        'S01E01 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt labore et dolore.mp4',
      ),
    ).toBe('S01E01 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt lab.mp4')
  })
})
