<script lang="ts">
  import { Content, Grid, Theme } from 'carbon-components-svelte'

  import Header from '../components/Header.svelte'
  import Footer from '../components/Footer.svelte'

  import '../../static/white.css'

  let theme: 'white' = 'white' as const
</script>

<Theme bind:theme />

<div id="layout">
  <Header />
  <Content style="background: none; padding: 0;">
    <Grid style="height: 100%">
      <slot />
    </Grid>
  </Content>
  <Footer />
</div>

<style>
  #layout {
    height: 100vh;
    display: grid;
    grid-template-rows: 1fr auto;
  }
</style>
