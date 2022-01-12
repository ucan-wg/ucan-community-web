import { writable } from 'svelte/store'

let route = writable({
  hash: null, 
  pathname: null
})

export { route }