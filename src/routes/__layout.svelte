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

:global(div.markdown-generated > p), 
:global(div.markdown-generated > ul),
:global(div.markdown-generated > pre) {
  /* border: 1px dashed blue; */
  margin-bottom: 1.2em;
  width: 95%;
}

:global(div.markdown-generated > pre) {
  background-color: #dedede;
  padding: 5px;
  overflow: auto;
}

:global(div.markdown-generated) {
  padding: 10px;
}

:global(div.markdown-generated), 
:global(div.markdown-generated p), 
:global(div.markdown-generated ul li),
:global(div.markdown-generated a) {
  font-family:Arial, Helvetica, sans-serif;
  font-size: large;
  line-height: 1.4em;
}

:global(div.markdown-generated h1), :global(div.markdown-generated h2), :global(div.markdown-generated h3) {
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  margin-bottom: 0.8em;
}

:global(div.markdown-generated ul li) {
  list-style: disc;
  margin-left: 1.4em;
}

:global(div.markdown-generated a) {
  color: blue;
}

:global(div.markdown-generated a:visited) {
  color: rebeccapurple;
}

:global(div.markdown-generated a:hover) {
  color: red;
}

:global(.\.eg-header) {
  color: red;
}

:global(.eg-payload) {
  color: green;
}

:global(.eg-sig) {
  color: blue;
}

</style>
