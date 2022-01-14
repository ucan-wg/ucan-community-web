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
        <slot/>
      </Column>
    </Row>
  </Grid>
</Content>
<Footer />

<style>

/* Styles to normalize how the markdown-sourced content looks */

:global(div.markdown-generated > pre) {
  background-color: #dedede;
  padding: 5px;
  overflow: auto;
}

:global(div.markdown-generated) {
  padding: 10px;
}

:global(div.markdown-generated),
:global(div.markdown-generated > pre),
:global(div.markdown-generated p) {
  font-family:Arial, Helvetica, sans-serif;
  line-height: 1.4em;
  width: 95%;
}

:global(div.markdown-generated),
:global(div.markdown-generated > pre),
:global(div.markdown-generated p), 
:global(div.markdown-generated ul),
:global(div.markdown-generated a.bx--link) {
  font-size: large;
}

:global(div.markdown-generated),
:global(div.markdown-generated > pre),
:global(div.markdown-generated p), 
:global(div.markdown-generated ul) {
  margin-bottom: 1.2em;
  margin-top: 1.4em;
}

:global(div.markdown-generated h1), :global(div.markdown-generated h2), :global(div.markdown-generated h3) {
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  margin-bottom: 0.8em;
}

:global(div.markdown-generated ul li) {
  list-style: disc;
  margin-left: 1.4em;
  width: 95%;
}

:global(div.markdown-generated a) {
  color: #343434;
}

:global(div.markdown-generated a:visited) {
  color: rebeccapurple;
}

:global(div.markdown-generated a:hover) {
  color: red;
}

@media only screen and (max-width: 1056px)  {

  :global(main.bx--content) {
    padding: 0rem;
    margin-left: 2.0rem !important;
  }

  :global(div.bx--grid) {
    padding: 0;
  }
}

</style>
