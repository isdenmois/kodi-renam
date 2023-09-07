import { describe, it, vi, expect } from 'vitest'
import { api } from './api'
import { search } from './search'

describe('search', () => {
  it('returns correct data on valid input', async () => {
    const mockValue = {
      id: 1,
      image: 'banners/posters/5b97b0699db74.jpg',
      seriesName: 'Test Series',
      overview: 'This is a test series',
      network: 'Test Network',
      firstAired: '2022-01-01',
    }

    vi.spyOn(api, 'get').mockResolvedValue([mockValue])

    expect(await search('Test Series', 'en')).toEqual([
      {
        ...mockValue,
        image: `https://artworks.thetvdb.com${mockValue.image}`,
        firstAired: new Date(mockValue.firstAired),
      },
    ])
  })

  it('throws error on invalid input', async () => {
    vi.spyOn(api, 'get').mockRejectedValue(new Error('Invalid input'))

    await expect(search('Invalid Series', 'en')).rejects.toThrow('Invalid input')
  })
})
