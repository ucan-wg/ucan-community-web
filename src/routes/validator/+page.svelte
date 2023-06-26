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
    Tag,
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
  import { formatDate, formatJson, formatPayload } from '$lib/utils'
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
      'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCIsInVjdiI6IjAuOC4xIn0.eyJhdWQiOiJkaWQ6a2V5Ono2TWt0YWZaVFJFakprdlY1bWZKeGNMcE5Cb1ZQd0RMaFR1TWc5bmc3ZFk0ek1BTCIsImF0dCI6W3sid2l0aCI6eyJzY2hlbWUiOiJ3bmZzIiwiaGllclBhcnQiOiJkZW1vdXNlci5maXNzaW9uLm5hbWUvcHVibGljL3Bob3Rvcy8ifSwiY2FuIjp7Im5hbWVzcGFjZSI6InduZnMiLCJzZWdtZW50cyI6WyJPVkVSV1JJVEUiXX19LHsid2l0aCI6eyJzY2hlbWUiOiJ3bmZzIiwiaGllclBhcnQiOiJkZW1vdXNlci5maXNzaW9uLm5hbWUvcHVibGljL25vdGVzLyJ9LCJjYW4iOnsibmFtZXNwYWNlIjoid25mcyIsInNlZ21lbnRzIjpbIk9WRVJXUklURSJdfX1dLCJleHAiOjkyNTY5Mzk1MDUsImZjdCI6W10sImlzcyI6ImRpZDprZXk6ejZNa2ZmRFpDa0NUV3JlZzg4NjhmRzFGR0ZvZ2NKajVYNlBZOTNwUGNXRG45Ym9iIiwicHJmIjpbImV5SmhiR2NpT2lKRlpFUlRRU0lzSW5SNWNDSTZJa3BYVkNJc0luVmpkaUk2SWpBdU9DNHhJbjAuZXlKaGRXUWlPaUprYVdRNmEyVjVPbm8yVFd0bVprUmFRMnREVkZkeVpXYzRPRFk0WmtjeFJrZEdiMmRqU21vMVdEWlFXVGt6Y0ZCalYwUnVPV0p2WWlJc0ltRjBkQ0k2VzNzaWQybDBhQ0k2ZXlKelkyaGxiV1VpT2lKM2JtWnpJaXdpYUdsbGNsQmhjblFpT2lKa1pXMXZkWE5sY2k1bWFYTnphVzl1TG01aGJXVXZjSFZpYkdsakwzQm9iM1J2Y3k4aWZTd2lZMkZ1SWpwN0ltNWhiV1Z6Y0dGalpTSTZJbmR1Wm5NaUxDSnpaV2R0Wlc1MGN5STZXeUpQVmtWU1YxSkpWRVVpWFgxOVhTd2laWGh3SWpvNU1qVTJPVE01TlRBMUxDSm1ZM1FpT2x0ZExDSnBjM01pT2lKa2FXUTZhMlY1T25vMlRXdHJPRGxpUXpOS2NsWnhTMmxsTnpGWlJXTmpOVTB4VTAxV2VIVkRaMDU0Tm5wTVdqaFRXVXB6ZUVGTWFTSXNJbkJ5WmlJNlcxMTkuOENaYmM1aHljbmRZT2dIa2REaXNxN3hWbmJGVHc2Z1hSdEhZNWZ0SWRoYWpuNGlCbkcybDJra3pjcE5sZDhxeUZLemt3bThIWXlXWU1pbEkxU2VtQlEiLCJleUpoYkdjaU9pSkZaRVJUUVNJc0luUjVjQ0k2SWtwWFZDSXNJblZqZGlJNklqQXVPQzR4SW4wLmV5SmhkV1FpT2lKa2FXUTZhMlY1T25vMlRXdG1aa1JhUTJ0RFZGZHlaV2M0T0RZNFprY3hSa2RHYjJkalNtbzFXRFpRV1RremNGQmpWMFJ1T1dKdllpSXNJbUYwZENJNlczc2lkMmwwYUNJNmV5SnpZMmhsYldVaU9pSjNibVp6SWl3aWFHbGxjbEJoY25RaU9pSmtaVzF2ZFhObGNpNW1hWE56YVc5dUxtNWhiV1V2Y0hWaWJHbGpMMjV2ZEdWekx5SjlMQ0pqWVc0aU9uc2libUZ0WlhOd1lXTmxJam9pZDI1bWN5SXNJbk5sWjIxbGJuUnpJanBiSWs5V1JWSlhVa2xVUlNKZGZYMWRMQ0psZUhBaU9qa3lOVFk1TXprMU1EVXNJbVpqZENJNlcxMHNJbWx6Y3lJNkltUnBaRHByWlhrNmVqWk5hMnM0T1dKRE0wcHlWbkZMYVdVM01WbEZZMk0xVFRGVFRWWjRkVU5uVG5nMmVreGFPRk5aU25ONFFVeHBJaXdpY0hKbUlqcGJYWDAuNXZTUHc5VzdpekhNWXEwbENpS3lISWZDdE1odVNualQtS3EtSWs5eGJLWnZ2MEhDY0pOQWxrWVRxZ2xEay1mV1RiMXJTeXd0LW5QQnhrMkZObHlzQ0EiXX0.Wlofmx5LmIAm7syMxan-n1Y6S-T6DFTjIU2LGMhzO1yfoFk2z8SLtkKGAj91ZoBN77b-_ZY5fj6SEmEJbqcUDQ'
    showUcan({ target: { value: encodedUcan } })
      .then()
      .catch(err => console.log(err))
  }

  const showInvalidExample = () => {
    encodedUcan =
      'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCIsInVjdiI6IjAuOC4xIn0.eyJhdWQiOiJkaWQ6a2V5Ono2TWt1ZTdzYWdudEhWZEFoTWN5V0tyMkQ1VE12VUVXVW5EN1d0Z05aZFRGcDdHNSIsImF0dCI6W3sid2l0aCI6eyJzY2hlbWUiOiJ3bmZzIiwiaGllclBhcnQiOiIvL2RlbW91c2VyLmZpc3Npb24ubmFtZS9wdWJsaWMvcGhvdG9zLyJ9LCJjYW4iOnsibmFtZXNwYWNlIjoid25mcyIsInNlZ21lbnRzIjpbIk9WRVJXUklURSJdfX1dLCJleHAiOjkyNTY5Mzk1MDUsImlzcyI6ImRpZDprZXk6ejZNa25lS01nZHpSeDJDdzZIMnJEcFpWdTU4VUY3THNwZzg4aVc3WmdURkQ5aTh4IiwicHJmIjpbImV5SmhiR2NpT2lKRlpFUlRRU0lzSW5SNWNDSTZJa3BYVkNJc0luVmpkaUk2SWpBdU9DNHhJbjAuZXlKaGRXUWlPaUprYVdRNmEyVjVPbm8yVFd0MVpUZHpZV2R1ZEVoV1pFRm9UV041VjB0eU1rUTFWRTEyVlVWWFZXNUVOMWQwWjA1YVpGUkdjRGRITlNJc0ltRjBkQ0k2VzNzaWQybDBhQ0k2ZXlKelkyaGxiV1VpT2lKM2JtWnpJaXdpYUdsbGNsQmhjblFpT2lJdkwyUmxiVzkxYzJWeUxtWnBjM05wYjI0dWJtRnRaUzl3ZFdKc2FXTXZjR2h2ZEc5ekx5SjlMQ0pqWVc0aU9uc2libUZ0WlhOd1lXTmxJam9pZDI1bWN5SXNJbk5sWjIxbGJuUnpJanBiSWs5V1JWSlhVa2xVUlNKZGZYMWRMQ0psZUhBaU9qa3lOVFk1TXprMU1EVXNJbWx6Y3lJNkltUnBaRHByWlhrNmVqWk5hM0Z3Y25Ga05sUkJhRFoxV0ZNemNVc3hPVWQ0Y1hSNFNtUlRlbGx6UlZJMWNVdDNWa0kxZDJGQmJtbDNJaXdpY0hKbUlqcGJYWDAuUEpmNjhoWWwwX0phb01DVGtOSWF2VHdyeEI5OGhSRm9OaDhqV0g4clc3clFGbWhnZTNZNGtiWG5wMGdMUEdOQkZaelFmZ2JkVUhhUzZ4WnJUZkJkQWc9PSIsImV5SmhiR2NpT2lKRlpFUlRRU0lzSW5SNWNDSTZJa3BYVkNJc0luVmpkaUk2SWpBdU9DNHhJbjAuZXlKaGRXUWlPaUprYVdRNmEyVjVPbm8yVFd0MmNVNTJRelpUZFdNeWFuRnljekZFYTNoSVVWVXhTbTlWWFpsVW5FNFkyTm5SV1EwUm1wcVZuWmFJaXdpYm1KbUlqb3hOak01TmpBNE56a3pMQ0p3Y21ZaU9sdGRmUS55Vll3OGN0U0RHYjJseGVTTDkwN09tbk1ZVU5XeUNiOVRlRmdHbGdOYjA5dHZoVEFkTTQ2ekpJTG1wLS1ja3RzeUhaZlRuQi1VVVFFMlFOWlg1WnVBQSIsImV5SmhiR2NpT2lKRlpFUlRRU0lzSW5SNWNDSTZJa3BYVkNJc0luVmpkaUk2SWpBdU9DNHhJbjAuZXlKaGRXUWlPaUprYVdRNmEyVjVPbm8yVFd0dVpVdE5aMlI2VW5neVEzYzJTREp5UkhCYVZuVTFPRlZHTjB4emNHYzRPR2xYTjFwblZFWkVPV2s0ZUNJc0ltRjBkQ0k2VzNzaWQybDBhQ0k2ZXlKelkyaGxiV1VpT2lKM2JtWnpJaXdpYUdsbGNsQmhjblFpT2lJdkwyUmxiVzkxYzJWeUxtWnBjM05wYjI0dWJtRnRaUzl3ZFdKc2FXTXZibTkwWlhNdkluMHNJbU5oYmlJNmV5SnVZVzFsYzNCaFkyVWlPaUozYm1aeklpd2ljMlZuYldWdWRITWlPbHNpVDFaRlVsZFNTVlJGSWwxOWZWMHNJbVY0Y0NJNk9USTFOamt6T1RVd05Td2lhWE56SWpvaVpHbGtPbXRsZVRwNk5rMXJjWEJ5Y1dRMlZFRm9OblZZVXpOeFN6RTVSM2h4ZEhoS1pGTjZXWE5GVWpWeFMzZFdRalYzWVVGdWFYY2lMQ0p3Y21ZaU9sdGRmUS5hdzJEQmh5T0hiN0MzTXJadURJa3N1SUZadjM2Z0VyaHFwaHMxemh6TEwxZjhHb0QwZU02bGJMZ1dGaEFJLVBPTGZBR204V2JGcFdXOW1IT2VESThEQSJdfQ.BbgQLCU-0QiTBOctnALSN5Ale-k4KXc4NEwn5RQ9gqpzVQUcGNg2kSUJblxEMGl0hDntLzreh0LGqcwqN9QpAw'
    showUcan({ target: { value: encodedUcan } })
      .then()
      .catch(err => console.log(err))
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
          <div class="encode-label">
            <span> Paste an encoded UCAN </span>
            <a
              class="version-support-label"
              href="https://github.com/ucan-wg/spec/blob/a411500d005e874f3cfa4010c82dc66d40a313f2/README.md"
              target="_blank"
              rel="noreferrer"
            >
              <Tag interactive type="blue" size="sm">Up to UCAN 0.8.1</Tag>
            </a>
          </div>
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
            {formatPayload(decodedUcan?.payload)}
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
            rel="noreferrer"
          >
            JWT RFC
          </Link>
          and the
          <Link
            href="https://whitepaper.fission.codes/access-control/ucan/jwt-authentication"
            target="_blank"
            rel="noreferrer"
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
    row-gap: 10px;
  }

  .encode-label {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }

  .version-support-label {
    display: grid;
    justify-items: end;
    text-decoration: none;
  }

  .validation-errors {
    width: 100%;
    padding: 5px 0 0 17px;
  }
</style>
