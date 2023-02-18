import { atom } from 'nanostores'

export const count$ = atom(0)

export const increment = () => count$.set(count$.get() + 1)

export const decrement = () => count$.set(count$.get() - 1)
