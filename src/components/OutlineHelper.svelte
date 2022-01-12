<script>

import { route } from '$lib/nav_store'
import build from '$lib/docoutline'
import { onMount } from 'svelte'

onMount(() => {
  console.log(`in OutlineHelper.onMount() ${document.location.pathname}#${document.location.hash}`)

  // set the route store to the current browser state
  route.set({
    pathname: document.location.pathname,
    hash: document.location.hash
  })

  build('div.markdown-generated')
})

</script>

<!-- <p>Route: {$route.pathname} :: {$route.hash}</p> -->
