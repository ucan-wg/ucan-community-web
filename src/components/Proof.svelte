<script lang="ts">
  import type { ProofNode, ProofTree } from '$lib/proof-tree'

  import { getDelegates } from '$lib/proof-tree'
  import NodeGroup from '$components/proof/NodeGroup.svelte'

  export let proofTree: ProofTree

  let selected: ProofNode[] = null
  let proofs: ProofNode[] = []
  let delegates: ProofNode[] = []

  $: {
    selected = [proofTree]
    proofs = proofTree.proofs
    delegates = getDelegates(proofTree, [])
  }
</script>

{#if selected !== null}
  <div class="node-group-container">
    {#if delegates.length > 0}
      <NodeGroup type="delegate" bind:nodes={delegates} on:selectproof />
    {/if}
    <NodeGroup type="selected" bind:nodes={selected} on:selectproof />
    {#if proofs.length > 0}
      <NodeGroup type="proof" bind:nodes={proofs} on:selectproof />
    {/if}
  </div>
{/if}

<style>
  .node-group-container {
    display: flex;
    column-gap: 8px;
  }
</style>
