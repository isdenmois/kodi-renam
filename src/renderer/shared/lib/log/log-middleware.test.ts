import { describe, it, vi, expect, beforeEach } from 'vitest'
import type { WretchResponse } from 'wretch'
import { logMiddleware } from './log-middleware'

describe('logMiddleware', () => {
  let response: WretchResponse

  beforeEach(() => {
    response = {
      ok: true,
      status: 200,
      statusText: 'OK',
      text: vi.fn().mockResolvedValue('response body'),
      clone: vi.fn().mockReturnThis(),
      headers: {
        entries: vi.fn().mockReturnValue([]),
      },
    } as unknown as WretchResponse
  })

  it('should call next with the correct arguments', async () => {
    const next = vi.fn().mockResolvedValue(response)
    const middleware = logMiddleware(next)

    await middleware('url', { method: 'GET' })

    expect(next).toHaveBeenCalledWith('url', { method: 'GET' })
  })

  it('should not log error when response is ok', async () => {
    const next = vi.fn().mockResolvedValue(response)
    const middleware = logMiddleware(next)
    vi.stubGlobal('console', {
      error: vi.fn(),
    })

    await middleware('url', { method: 'GET' })

    expect(console.error).not.toHaveBeenCalled()
  })

  it('should log error when response is not ok', async () => {
    const next = vi.fn().mockResolvedValue({ ...response, ok: false })
    const middleware = logMiddleware(next)
    vi.stubGlobal('console', {
      error: vi.fn(),
    })

    await middleware('url', { method: 'GET' })

    expect(console.error).toHaveBeenCalledOnce()
  })
})
