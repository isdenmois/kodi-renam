import { atom } from 'nanostores'
import { env } from 'shared/lib'

export const count$ = atom(env.counterInitial)

export const increment = () => count$.set(count$.get() + 1)

export const decrement = () => {
  const count = count$.get()

  if (count > 0) {
    count$.set(count - 1)
  }
}
