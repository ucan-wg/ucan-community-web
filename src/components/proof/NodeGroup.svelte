<script lang="ts">
  import type { ProofNode } from '$lib/proof-tree'

  import Node from '$components/proof/Node.svelte'

  export let nodes: ProofNode[] = []
  export let type: 'selected' | 'proof' | 'delegate'
</script>

<div class="node-group">
  {#each nodes as node, index}
    {#if type === 'delegate'}
      <Node
        {node}
        {type}
        label={`Delegate ${nodes.length - index}`}
        on:selectproof
      />
    {:else if type === 'selected'}
      <Node {node} {type} label="Selected" on:selectproof />
    {:else}
      <Node {node} {type} label={`Proof ${index + 1}`} on:selectproof />
    {/if}
  {/each}
</div>

<style>
  .node-group {
    display: inline-flex;
    flex-direction: row;
    column-gap: 2px;
  }
</style>
