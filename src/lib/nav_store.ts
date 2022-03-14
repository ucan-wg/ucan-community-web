import type { Writable } from 'svelte/store'
import { writable } from 'svelte/store'

const route: Writable<{ hash: string; pathname: string }> = writable({
  hash: null,
  pathname: null
})

export { route }