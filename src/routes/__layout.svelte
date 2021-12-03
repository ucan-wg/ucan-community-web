<script lang="ts">
  import { 
    Content, 
    Grid, 
    Theme,
    Row, 
    Column
  } from 'carbon-components-svelte'

  import Header from '$components/Header.svelte'
  import Footer from '$components/Footer.svelte'
  import '$static/white.css'

  let theme: 'white' = 'white' as const
</script>

<Theme bind:theme />

<Header />
<Content>
  <Grid>
    <Row>
      <Column>
        <slot />
      </Column>
    </Row>
  </Grid>
</Content>
<Footer />


<style>

</style>
