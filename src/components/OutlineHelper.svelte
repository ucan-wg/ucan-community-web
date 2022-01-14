<script>

import { route } from '$lib/nav_store'
import build from '$lib/docoutline'
import { onMount, tick } from 'svelte'

onMount(() => {
  // console.log(`in OutlineHelper.onMount() ${document.location.pathname}`)

  // set the route store to the current browser state
  route.set({
    pathname: document.location.pathname,
    hash: document.location.hash
  });

  (async function () {
    await tick()
    build('div.markdown-generated')
  })()
})

</script>
