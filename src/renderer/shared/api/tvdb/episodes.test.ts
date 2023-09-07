import { describe, it, vi, expect } from 'vitest'
import { api } from './api'
import { episodes } from './episodes'

describe('episodes', () => {
  it('returns correct data on valid input', async () => {
    const mockValue = {
      id: 1,
      episodeName: 'Test Episode',
      filename: '5b97b0699db74.jpg',
      siteRating: 3,
      airedEpisodeNumber: 25,
    }

    vi.spyOn(api, 'get').mockResolvedValue([mockValue])

    expect(await episodes(2, 1, 'en')).toEqual([
      {
        ...mockValue,
        filename: 'https://artworks.thetvdb.com/banners/5b97b0699db74.jpg',
      },
    ])
  })

  it('returns correct even on minimal data', async () => {
    const mockValue = {
      id: 1,
      airedEpisodeNumber: 1,
    }

    vi.spyOn(api, 'get').mockResolvedValue([mockValue])

    expect(await episodes(1, 1, 'en')).toEqual([
      {
        ...mockValue,
        episodeName: 'Untitled episode',
        filename: null,
      },
    ])
  })

  it('throws error on invalid input', async () => {
    vi.spyOn(api, 'get').mockRejectedValue(new Error('Invalid input'))

    await expect(episodes(1, 1, 'en')).rejects.toThrow('Invalid input')
  })
})
