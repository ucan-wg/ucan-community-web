<script lang="ts">
  import { Content, Grid } from 'carbon-components-svelte';

  import Header from '../components/Header.svelte';
  import Theme from '../components/Theme.svelte';
  import Footer from '../components/Footer.svelte';

  import '../../static/white.css';
  let theme: 'white' = 'white';
</script>


<div id="layout">
  <Theme persist bind:theme>
    <Header />
    <Content style="background: none; padding: 0;">
      <Grid style="height: 100%">
        <slot />
      </Grid>
    </Content>
    <Footer />
  </Theme>
</div>

<style>
  #layout {
    height: 100vh;
    display: grid;
    grid-template-rows: 1fr auto;
  }
</style>
