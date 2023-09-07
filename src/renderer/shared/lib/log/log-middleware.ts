import type { FetchLike, WretchOptions, WretchResponse } from 'wretch'

const formatHeader = ([header, value]: [string, string]) => `${header}: ${value}`

const logError = async (url: string, opts: WretchOptions, response: WretchResponse) => {
  const body = await response.text().catch(() => '')

  console.error(
    [
      `${opts.method} ${url} HTTP/1.1`,
      ...Object.entries(opts.headers || {}).map(formatHeader),
      ...(opts.body ? ['', opts.body] : []),
      '================================',
      '================================',
      `HTTP/1.1 ${response.status} (${response.statusText})`,
      ...[...response.headers.entries()].map(formatHeader),
      '',
      body,
    ].join('\n'),
  )
}

export function logMiddleware(next: FetchLike): FetchLike {
  return (url, opts) => {
    return next(url, opts).then(async response => {
      if (!response.ok) {
        await logError(url, opts, response.clone())
      }

      return response
    })
  }
}
