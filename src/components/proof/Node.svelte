<script lang="ts">
  import { Button } from 'carbon-components-svelte'
  import { createEventDispatcher } from 'svelte'

  import type { ProofNode } from '$lib/proof-tree'
  import NodeHint from './NodeHint.svelte'

  export let node: ProofNode
  export let type: 'selected' | 'proof' | 'delegate'
  export let label: string

  let isValid: boolean = true
  let buttonProps: { class: string }

  const dispatch = createEventDispatcher()

  const select = () => {
    dispatch('selectproof', { node })
  }

  const kind =
    type === 'selected'
      ? 'primary'
      : type === 'proof'
      ? 'secondary'
      : 'tertiary'

  $: isValid =
    node.ucan !== null &&
    node.validation !== null &&
    node.validation.notValidYet === false &&
    node.validation.active === true &&
    node.validation.valid === true &&
    node.validation.validIssuer === true &&
    node.validation.validProofs === true

  $: buttonProps = {
    class: [
      'button',
      'bx--btn',
      `bx--btn--${kind}`,
      !isValid && 'bx--btn--warning',
      node.ucan === null && 'bx--btn--undecodable'
    ]
      .filter(Boolean)
      .join(' ')
  }
</script>

<NodeHint direction="top" align="start">
  <Button as>
    <div {...buttonProps} on:click={select}>
      <span class="absolute-label">{node.label}</span>
      <span>{label}</span>
    </div>
  </Button>
  <div slot="tooltip" class="tooltip">
    <div class="tooltip-row">
      <span>Valid</span>
      <span>{isValid}</span>
    </div>
    <div class="tooltip-row">
      <span>Issuer</span>
      <span>{node.ucan ? node.ucan.payload.iss : 'Cannot decode token'}</span>
    </div>
    <div class="tooltip-row">
      <span>Audience</span>
      <span>{node.ucan ? node.ucan.payload.aud : 'Cannot decode token'}</span>
    </div>
  </div>
</NodeHint>

<style>
  .button {
    display: grid;
    grid-template-columns: 1fr 5fr;
    grid-gap: 8px;
    padding: calc(0.875rem - 3px) 15px calc(0.875rem - 3px) 15px;
  }

  .bx--btn--warning::after {
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 12px 12px 0;
    border-color: transparent #f1c21b transparent transparent;
    content: '';
  }

  .bx--btn--undecodable::after {
    filter: opacity(60%) saturate(300%);
  }

  .absolute-label {
    font-size: 12px;
    border: 1px solid #eee;
    padding: 0 3px 0 3px;
  }

  .bx--btn--tertiary .absolute-label {
    border: 1px solid #4385fe;
  }

  .tooltip {
    display: grid;
    row-gap: 12px;
  }

  .tooltip-row {
    display: grid;
    grid-template-columns: 1fr 3fr;
    column-gap: 15px;
  }
</style>
