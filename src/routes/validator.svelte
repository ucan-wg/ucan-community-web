<script lang="ts">
  import {
    Button,
    ButtonSet,
    CodeSnippet,
    Column,
    InlineNotification,
    Link,
    ListItem,
    Row,
    StructuredList,
    StructuredListHead,
    StructuredListRow,
    StructuredListCell,
    StructuredListBody,
    UnorderedList
  } from 'carbon-components-svelte'
  import { truncate } from 'carbon-components-svelte/actions'
  import { onMount } from 'svelte'

  import type { Ucan } from 'ucans'
  import type { Validation } from '$lib/ucan'
  import type { ProofTree } from '$lib/proof-tree'

  import * as explantion from '$lib/explanation'
  import * as ucan from '$lib/ucan'
  import * as ucans from 'ucans'
  import { formatDate, formatJson } from '$lib/utils'
  import { createProofTree } from '$lib/proof-tree'
  import Proof from '$components/Proof.svelte'
  import OutlineHelper from '$components/OutlineHelper.svelte'

  let setDevice = () => {}

  let encodedUcan: string = ''
  let decodedUcan: Ucan | null = null
  let validation: Validation | null = null
  let proofTree: ProofTree = null
  let isMobileDevice: boolean

  // It's pretty useful to expose UCAN as a constant in the window,
  // so developers can just open up the DevTools on the page and play with the library
  window['UCAN'] = ucans

  onMount(() => {
    setDevice = () => {
      if (window.innerWidth <= 768) {
        isMobileDevice = true
      } else {
        isMobileDevice = false
      }
    }

    setDevice()
  })

  const showUcan = async event => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    encodedUcan = event.target.value.trim()
    decodedUcan = await ucan.decode(encodedUcan)

    try {
      proofTree = await createProofTree(encodedUcan)
    } catch (err) {
      console.log('Could not create proof tree: ', err)
    }
  }

  const showExample = () => {
    encodedUcan =
      'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCIsInVjdiI6IjAuNy4wIn0.eyJhdWQiOiJkaWQ6a2V5Ono2TWt2WGZQVXY4Ynh0c1ZRaUdvN050azRxS0pOY2dLMml0NTJwYzczdGVVcFJMVCIsImF0dCI6W3sid25mcyI6ImRlbW91c2VyLmZpc3Npb24ubmFtZS9wdWJsaWMvcGhvdG9zLyIsImNhcCI6Ik9WRVJXUklURSJ9LHsid25mcyI6ImRlbW91c2VyLmZpc3Npb24ubmFtZS9wdWJsaWMvbm90ZXMvIiwiY2FwIjoiT1ZFUldSSVRFIn1dLCJleHAiOjkyNTY5Mzk1MDUsImlzcyI6ImRpZDprZXk6ejZNa3NYUUJmTDhvd3p0VENKVG03aE5SZjZiMThZeFhQcDNpNjZvSkhtOEwzWUdKIiwibmJmIjoxNjM5NjA4MjkzLCJwcmYiOlsiZXlKaGJHY2lPaUpGWkVSVFFTSXNJblI1Y0NJNklrcFhWQ0lzSW5WamRpSTZJakF1Tnk0d0luMC5leUpoZFdRaU9pSmthV1E2YTJWNU9ubzJUV3R6V0ZGQ1prdzRiM2Q2ZEZSRFNsUnROMmhPVW1ZMllqRTRXWGhZVUhBemFUWTJiMHBJYlRoTU0xbEhTaUlzSW1GMGRDSTZXM3NpZDI1bWN5STZJbVJsYlc5MWMyVnlMbVpwYzNOcGIyNHVibUZ0WlM5d2RXSnNhV012Y0dodmRHOXpMeUlzSW1OaGNDSTZJazlXUlZKWFVrbFVSU0o5WFN3aVpYaHdJam81TWpVMk9UTTVOVEExTENKcGMzTWlPaUprYVdRNmEyVjVPbm8yVFd0d05VVnplamx6TWsxSWMzRlpka3h2WTJONVNIZFlOVk5sZVZwTGNIRTNPVWQwTkRWbVJrZEZXbEk1T1NJc0ltNWlaaUk2TVRZek9UWXdPREk1TXl3aWNISm1JanBiWFgwLjRUTmh1SFJyUEc5YUhvODY5SFhsc05LOF9GbWxTaFE1R3pHNGl0TjJOS2steUtUYkFNb0Z3VHVwdEcwWEZnTkl2SHVsUHBsVnpaWURWRGV4bzc2a0F3IiwiZXlKaGJHY2lPaUpGWkVSVFFTSXNJblI1Y0NJNklrcFhWQ0lzSW5WamRpSTZJakF1Tnk0d0luMC5leUpoZFdRaU9pSmthV1E2YTJWNU9ubzJUV3R6V0ZGQ1prdzRiM2Q2ZEZSRFNsUnROMmhPVW1ZMllqRTRXWGhZVUhBemFUWTJiMHBJYlRoTU0xbEhTaUlzSW1GMGRDSTZXM3NpZDI1bWN5STZJbVJsYlc5MWMyVnlMbVpwYzNOcGIyNHVibUZ0WlM5d2RXSnNhV012Ym05MFpYTXZJaXdpWTJGd0lqb2lUMVpGVWxkU1NWUkZJbjFkTENKbGVIQWlPamt5TlRZNU16azFNRFVzSW1semN5STZJbVJwWkRwclpYazZlalpOYTNBMVJYTjZPWE15VFVoemNWbDJURzlqWTNsSWQxZzFVMlY1V2t0d2NUYzVSM1EwTldaR1IwVmFVams1SWl3aWJtSm1Jam94TmpNNU5qQTRNamt6TENKd2NtWWlPbHRkZlEuTWdZYXJMcXk3Um1RMUFJcnFZTDZjRnk5ejdhNVdJQVUtLVRZQVJQU2dpck9Tc3p2YXIzX0ROcjI1cmJQcmV0SGJuVDBtTVZLeW9hUVhydVI3S2JyQmciXX0.kwRdqPN74pkcpXGgdk7Z7FW3M1mRRYaDE5ZgkG6srAuu6V6mvMVRdBLnD5CWid-X4tDIKpliVjlCSLTntB4pCw'
    showUcan({ target: { value: encodedUcan } })
  }

  const showInvalidExample = () => {
    encodedUcan =
      'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCIsInVjdiI6IjAuNy4wIn0.eyJhdWQiOiJkaWQ6a2V5Ono2TWt1UzNKdlFpdEhxbTJTZzJCRHMyb3hGeVc0em1tQzRnOGtKRXBBTWVyVnp0RyIsImF0dCI6W3sid25mcyI6ImRlbW91c2VyLmZpc3Npb24ubmFtZS9wdWJsaWMvcGhvdG9zLyIsImNhcCI6Ik9WRVJXUklURSJ9LHsid25mcyI6ImRlbW91c2VyLmZpc3Npb24ubmFtZS9wdWJsaWMvbm90ZXMvIiwiY2FwIjoiT1ZFUldSSVRFIn1dLCJleHAiOjkyNTY5Mzk1MDUsImlzcyI6ImRpZDprZXk6ejZNa2tpQ0piRVVSYU1LSHJ0a0VnYmlVQWN4cDNzZ3RRMU1lV3BrZ2NtUWFWZVc2IiwibmJmIjoxNjM5NjA4ODc4LCJwcmYiOlsiZXlKaGJHY2lPaUpGWkVSVFFTSXNJblI1Y0NJNklrcFhWQ0lzSW5WamRpSTZJakF1Tnk0d0luMC5leUpoZFdRaU9pSmthV1E2YTJWNU9ubzJUV3RyYVVOS1lrVlZVbUZOUzBoeWRHdEZaMkpwVlVGamVIQXpjMmQwVVRGTlpWZHdhMmRqYlZGaFZtVlhOaUlzSW1GMGRDSTZXM3NpZDI1bWN5STZJbVJsYlc5MWMyVnlMbVpwYzNOcGIyNHVibUZ0WlM5d2RXSnNhV012Y0dodmRHOXpMeUlzSW1OaGNDSTZJazlXUlZKWFVrbFVSU0o5WFN3aVpYaHdJam81TWpVMk9UTTVOVEExTENKcGMzTWlPaUprYVdRNmEyVjVPbm8yVFd0b1ltRTNObHB6YTFkclJVZEdhalptVkUxaWRGUk9XSFp6UVRRek5YZFVlVzVsTVZsMmFFTTRhMFJ5TnlJc0ltNWlaaUk2TVRZek9UWXdPRGczT0N3aWNISm1JanBiWFgwLlBKZjY4aFlsMF9KYW9NQ1RrTklhdlR3cnhCOThoUkZvTmg4aldIOHJXN3JRRm1oZ2UzWTRrYlhucDBnTFBHTkJGWnpRZmdiZFVIYVM2eFpyVGZCZEFnPT0iLCJleUpoYkdjaU9pSkZaRVJUUVNJc0luUjVjQ0k2SWtwWFZDSXNJblZqZGlJNklqQXVOeTR3SW4wLmV5SmhkV1FpT2lKa2FXUTZhMlY1T25vMlRXdDJjVTUyUXpaVGRXTXlhbkZ5Y3pGRWEzaElVVlV4U205VlhabFVuRTRZMk5uUldRMFJtcHFWblphSWl3aWJtSm1Jam94TmpNNU5qQTROemt6TENKd2NtWWlPbHRkZlEueVZZdzhjdFNER2IybHhlU0w5MDdPbW5NWVVOV3lDYjlUZUZnR2xnTmIwOXR2aFRBZE00NnpKSUxtcC0tY2t0c3lIWmZUbkItVVVRRTJRTlpYNVp1QUEiLCJleUpoYkdjaU9pSkZaRVJUUVNJc0luUjVjQ0k2SWtwWFZDSXNJblZqZGlJNklqQXVOeTR3SW4wLmV5SmhkV1FpT2lKa2FXUTZhMlY1T25vMlRXdHJhVU5LWWtWVlVtRk5TMGh5ZEd0RloySnBWVUZqZUhBemMyZDBVVEZOWlZkd2EyZGpiVkZoVm1WWE5pSXNJbUYwZENJNlczc2lkMjVtY3lJNkltUmxiVzkxYzJWeUxtWnBjM05wYjI0dWJtRnRaUzl3ZFdKc2FXTXZibTkwWlhNdklpd2lZMkZ3SWpvaVQxWkZVbGRTU1ZSRkluMWRMQ0psZUhBaU9qa3lOVFk1TXprMU1EVXNJbWx6Y3lJNkltUnBaRHByWlhrNmVqWk5hMmhpWVRjMlduTnJWMnRGUjBacU5tWlVUV0owVkU1WWRuTkJORE0xZDFSNWJtVXhXWFpvUXpoclJISTNJaXdpYm1KbUlqb3hOak01TmpBNE9EYzRMQ0p3Y21ZaU9sdGRmUS50NnhWLXZ3ZjBNbm0yTmt3aXl4X2stRFVQVWJ1LThOU1dyUmc1U01rQmY3TWQ5dGZhZ2JTZkFzTS1iRDJCcUdxYUZ6TXRULUFtbzZwcE85cHhaZ0JDUSJdfQ.GzBKFMHthcqWNJZgiFCjS3zYsOT_ygwdacfxZl_LB0yGqfq_90Eb6Y7t33UFcxXi8k5mMjKV3_cjiGilMYwEAw'
    showUcan({ target: { value: encodedUcan } })
  }

  const showProof = async (event: CustomEvent) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    proofTree = event.detail.node
    encodedUcan = proofTree.token
    decodedUcan = await ucan.decode(encodedUcan)
  }

  $: {
    if (decodedUcan) {
      ucan
        .validate(encodedUcan)
        .then(result => (validation = result.validation))
        .catch(() => (validation = null))
    }
  }

  $: isValid =
    validation !== null &&
    validation.notValidYet === false &&
    validation.active === true &&
    validation.valid === true &&
    validation.validIssuer === true &&
    validation.validProofs === true
</script>

<svelte:window on:resize={setDevice} />

<OutlineHelper />

<InlineNotification lowContrast kind="info" title="Hey there 👋">
  <div style="padding-top: 5px">
    You are using a preview version of UCAN Check. This version only supports
    the latest UCAN version. Try out the
    <Link href="https://github.com/ucan-wg/ts-ucan" target="_blank">
      UCAN library
    </Link>
    to make some!
  </div>
</InlineNotification>

<Row padding>
  <Column>
    <h2>UCAN Check</h2>
  </Column>
</Row>

<Row>
  <div class="encode-decode-container">
    <Column>
      <div class="encode-section">
        <h3>Encoded</h3>
        <div class="encode-container">
          <div>Paste an encoded UCAN</div>
          <textarea
            class="bx--text-area"
            bind:value={encodedUcan}
            on:input={showUcan}
          />
        </div>
      </div>
    </Column>
    <Column>
      <Row>
        <Column>
          <h3>Decoded</h3>
        </Column>
      </Row>
      <Row padding>
        <Column>
          <div style="padding-bottom: 5px">Header</div>
          <CodeSnippet type="multi" hideCopyButton>
            {formatJson(decodedUcan?.header)}
          </CodeSnippet>
        </Column>
      </Row>
      <Row>
        <Column>
          <div style="padding-bottom: 5px">Payload</div>
          <CodeSnippet type="multi" hideCopyButton>
            {formatJson(decodedUcan?.payload)}
          </CodeSnippet>
        </Column>
      </Row>
      <Row padding>
        <Column>
          <div style="padding-bottom: 5px">Signature</div>
          <CodeSnippet type="multi" hideCopyButton>
            {decodedUcan?.signature ?? ''}
          </CodeSnippet>
        </Column>
      </Row>
    </Column>
  </div>
</Row>

{#if encodedUcan === ''}
  <Row>
    <Column>
      <ButtonSet>
        <Button on:click={showExample}>Show Example</Button>
        <Button kind="secondary" on:click={showInvalidExample}>
          Show Invalid Example
        </Button>
      </ButtonSet>
    </Column>
  </Row>
{:else if proofTree !== null}
  <Row>
    <Column>
      <Proof bind:proofTree on:selectproof={showProof} />
    </Column>
  </Row>
{/if}

{#if encodedUcan !== ''}
  {#if decodedUcan === null}
    <Row>
      <Column>
        <InlineNotification
          kind="warning-alt"
          title="Decoding error."
          subtitle="The UCAN could not be decoded. UCANs must be base64 encoded."
          lowContrast
        />
      </Column>
    </Row>
  {:else if !isValid && validation}
    <Row>
      <Column>
        <InlineNotification kind="warning-alt" title="Invalid UCAN" lowContrast>
          <div class="validation-errors">
            <UnorderedList>
              {#if validation.valid === false}
                <ListItem>
                  UCAN was not signed by the issuer or someone has tampered with
                  it
                </ListItem>
              {/if}
              {#if validation.notValidYet === true}
                <ListItem>
                  UCAN is not valid until {formatDate(decodedUcan.payload.nbf)}
                </ListItem>
              {/if}
              {#if validation.active === false}
                <ListItem>
                  UCAN expired on {formatDate(decodedUcan.payload.exp)}
                </ListItem>
              {/if}
              {#if validation.validIssuer === false}
                <ListItem>
                  The issuer cannot grant all of the capabilities listed in the
                  attenuation. The audience in each proof must match the issuer
                  to delegate capabilities.
                </ListItem>
              {/if}
              {#if validation.validProofs === false}
                <ListItem>One or more UCAN proofs are invalid</ListItem>
              {/if}
            </UnorderedList>
          </div>
        </InlineNotification>
      </Column>
    </Row>
  {:else}
    <Row>
      <Column>
        <InlineNotification
          kind="success"
          title="Valid UCAN."
          subtitle="The UCAN is valid and has not expired."
          lowContrast
        />
      </Column>
    </Row>
  {/if}
{/if}

<Row>
  <Column>
    {#if decodedUcan !== null}
      <Row padding>
        <Column>
          <h3>Explanation</h3>
        </Column>
      </Row>
      <Row>
        <Column>
          Please see the
          <Link
            href="https://datatracker.ietf.org/doc/html/rfc7519"
            target="_blank"
          >
            JWT RFC
          </Link>
          and the
          <Link
            href="https://whitepaper.fission.codes/access-control/ucan/jwt-authentication"
            target="_blank"
          >
            UCAN specification
          </Link>
          for more details.
        </Column>
      </Row>
      <Row>
        <Column>
          <StructuredList>
            <StructuredListHead>
              <StructuredListRow head>
                <StructuredListCell head>Field</StructuredListCell>
                <StructuredListCell head>Long Name</StructuredListCell>
                {#if !isMobileDevice}
                  <StructuredListCell head>Value</StructuredListCell>
                {/if}
                <StructuredListCell head>Details</StructuredListCell>
              </StructuredListRow>
            </StructuredListHead>
            <StructuredListBody>
              {#each explantion.headerFields(decodedUcan) as row}
                <StructuredListRow>
                  <StructuredListCell noWrap>{row.field}</StructuredListCell>
                  <StructuredListCell noWrap>{row.longName}</StructuredListCell>
                  {#if !isMobileDevice}
                    <StructuredListCell>{row.value}</StructuredListCell>
                  {/if}
                  <StructuredListCell>
                    {row.details}
                  </StructuredListCell>
                </StructuredListRow>
              {/each}
              {#each explantion.payloadFields(decodedUcan) as row}
                <StructuredListRow>
                  <StructuredListCell noWrap>{row.field}</StructuredListCell>
                  <StructuredListCell noWrap>{row.longName}</StructuredListCell>
                  {#if !isMobileDevice}
                    <StructuredListCell>
                      {#if row.value.length === 1}
                        {row.value[0]}
                      {:else}
                        <Column noGutter>
                          {#each row.value as val}
                            <div use:truncate>{val}</div>
                          {/each}
                        </Column>
                      {/if}
                    </StructuredListCell>
                  {/if}
                  <StructuredListCell>
                    {row.details}
                  </StructuredListCell>
                </StructuredListRow>
              {/each}
            </StructuredListBody>
          </StructuredList>
        </Column>
      </Row>
    {/if}
  </Column>
</Row>

<style>
  .encode-decode-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    grid-gap: 1rem;
    width: 100%;
  }

  .encode-section {
    display: grid;
    grid-template-rows: 2rem minmax(250px, auto);
    row-gap: 1rem;
    height: 100%;
    padding-bottom: 1rem;
  }
  
  .encode-container {
    display: grid;
    grid-template-rows: 14px auto;
    row-gap: 5px;
  }

  .validation-errors {
    width: 100%;
    padding: 5px 0 0 17px;
  }
</style>
