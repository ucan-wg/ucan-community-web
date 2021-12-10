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

  // let theme: 'white' = 'white' as const
  let theme: 'white' = 'white' as const

</script>

<Theme bind:theme />

<Header />
<Content>
  <Grid>
    <Row>
      <Column>
        <div class="markdown-document">
          <slot />
        </div>
      </Column>
    </Row>
  </Grid>
</Content>
<Footer />

<style>

:global(div.markdown-document > *) {
  /* border: 1px dashed blue; */
  margin-bottom: 0.5em;
}

:global(div.markdown-document) {
  padding: 10px;  
}

:global(div.markdown-document), :global(div.markdown-document *) {
  font-family:Arial, Helvetica, sans-serif
}

:global(div.markdown-document h1), :global(div.markdown-document h2), :global(div.markdown-document h3) {
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

:global(div.markdown-document ul li) {
  list-style: disc;
  margin-left: 1em;
}

</style>
