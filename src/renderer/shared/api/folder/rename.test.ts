import { test, expect, vi } from 'vitest'
import { rename } from './rename'
import { api } from './api'

test('rename', async () => {
  const hash = 'testHash'
  const oldPath = 'oldPath'
  const newPath = 'newPath'

  const apiMock = vi.spyOn(api as { url(url: string): unknown }, 'url').mockReturnValue({
    formUrl: vi.fn().mockReturnThis(),
    post: vi.fn().mockReturnThis(),
    text: vi.fn().mockResolvedValue('success'),
  })

  const result = await rename(hash, oldPath, newPath)

  expect(apiMock).toHaveBeenCalledWith('/torrents/renameFile')
  expect(result).toEqual('success')
})
