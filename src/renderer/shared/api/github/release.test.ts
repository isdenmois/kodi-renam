import { describe, it, expect, vi } from 'vitest'
import { api } from './api'
import { latestRelease } from './release'

describe('latestRelease', () => {
  it('returns the latest release', async () => {
    const mockValue = {
      id: 1,
      tag_name: 'v1.0',
      html_url: 'https://github.com/user/repo/releases/v1.0',
      created_at: new Date().toISOString(),
    }

    vi.spyOn(api as { get(): unknown }, 'get').mockReturnValue({
      json: () => Promise.resolve(mockValue),
    })

    expect(await latestRelease()).toEqual({
      ...mockValue,
      created_at: new Date(mockValue.created_at),
    })
  })

  it('throws an error when the API call fails', async () => {
    vi.spyOn(api as { get(): unknown }, 'get').mockReturnValue({
      json: () => Promise.reject('API call failed'),
    })

    await expect(latestRelease()).rejects.toThrow('API call failed')
  })
})
