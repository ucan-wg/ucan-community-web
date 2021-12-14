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
    TextArea,
    UnorderedList
  } from 'carbon-components-svelte'

  import type { Ucan } from 'ucans'
  import type { Validation } from '$lib/ucan'

  import * as explantion from '$lib/explanation'
  import * as ucan from '$lib/ucan'
  import { formatDate, formatJson } from '$lib/utils'

  let encodedUcan: string = ''
  let decodedUcan: Ucan | null = null
  let validation: Validation | null = null
  let isMobileDevice: boolean

  const decode = event => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    encodedUcan = event.target.value.trim()
    decodedUcan = ucan.decode(encodedUcan)
  }

  const showExample = () => {
    encodedUcan =
      'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCIsInVjdiI6IjAuNy4wIn0.eyJhdWQiOiJkaWQ6a2V5Ono2TWtzcFNaVlNBM0tWVXZWazZvNVpWTmJ6ZWNqUkNETmZ0TlJMN3M3REtHZkhGbiIsImF0dCI6W3sid25mcyI6ImRlbW91c2VyLmZpc3Npb24ubmFtZS9wdWJsaWMvcGhvdG9zLyIsImNhcCI6Ik9WRVJXUklURSJ9XSwiZXhwIjo5MjU2OTM5NTA1LCJpc3MiOiJkaWQ6a2V5Ono2TWtoSHN1Y012c05ISDNvU3E0YW15a2RodVY2QjVBR1ZaSnpDaG5UOE1KTk03WiIsIm5iZiI6MTYzOTAwMTY0MCwicHJmIjpbImV5SmhiR2NpT2lKRlpFUlRRU0lzSW5SNWNDSTZJa3BYVkNJc0luVmpkaUk2SWpBdU55NHdJbjAuZXlKaGRXUWlPaUprYVdRNmEyVjVPbm8yVFd0b1NITjFZMDEyYzA1SVNETnZVM0UwWVcxNWEyUm9kVlkyUWpWQlIxWmFTbnBEYUc1VU9FMUtUazAzV2lJc0ltRjBkQ0k2VzNzaWQyNW1jeUk2SW1SbGJXOTFjMlZ5TG1acGMzTnBiMjR1Ym1GdFpTOXdkV0pzYVdNdmNHaHZkRzl6THlJc0ltTmhjQ0k2SWs5V1JWSlhVa2xVUlNKOVhTd2laWGh3SWpvNU1qVTJPVE01TlRBMUxDSnBjM01pT2lKa2FXUTZhMlY1T25vMlRXdG5ObEo0YVV4b1duQlJibFJoUkhJNGFUWmlXV053YVU1dVlrNDFabGRZUjNneVNuQlVNMnBxVXpKR1dpSXNJbTVpWmlJNk1UWXpPVEF3TVRZME1Dd2ljSEptSWpwYlhYMC5idFBVQ2w2cVg2WTMtdzE5NE9sZ09vSHN0TmFkNkszS2N1QnhJd0RUOUZfSnU5aDBwOUJyWXNwNHlORFFaYVFycXlWUV9lbjR1ajBnb0JXTExZWk5EUSJdfQ.jzRbm6D7FpKpouT7OrRrl_5-95vgZALyq-Vmy7LCYTx0OmxW8C6Ld2lSq1tIviotaIQ3hxVACdx-Q2yJ3i4GBA'
    decode({ target: { value: encodedUcan } })
  }

  const showInvalidExample = () => {
    encodedUcan =
      'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCIsInVjdiI6IjAuNy4wIn0.eyJhdWQiOiJkaWQ6a2V5Ono2TWttRDMxeG5aaFNnY3hwc2pxWmhSanRLMWJqUExxdVU1ZVNITTV6U3NIdzFtNSIsImF0dCI6W3sid25mcyI6ImRlbW91c2VyLmZpc3Npb24ubmFtZS9wdWJsaWMvcGhvdG9zLyIsImNhcCI6Ik9WRVJXUklURSJ9XSwiZXhwIjoxNjM5MDAxMTcyLCJpc3MiOiJkaWQ6a2V5Ono2TWtuVWppNUNTUVNLR1JEZkRSSjl3MWJoaUpLQ3dyTWFiczdkZUhjcW5CU1dIZyIsIm5iZiI6MTYzOTAwMTExMiwicHJmIjpbImV5SmhiR2NpT2lKRlpFUlRRU0lzSW5SNWNDSTZJa3BYVkNJc0luVmpkaUk2SWpBdU55NHdJbjAuZXlKaGRXUWlPaUprYVdRNmEyVjVPbm8yVFd0dFJETXhlRzVhYUZOblkzaHdjMnB4V21oU2FuUkxNV0pxVUV4eGRWVTFaVk5JVFRWNlUzTklkekZ0TlNJc0ltRjBkQ0k2VzNzaWQyNW1jeUk2SW1SbGJXOTFjMlZ5TG1acGMzTnBiMjR1Ym1GdFpTOXdkV0pzYVdNdmNHaHZkRzl6THlJc0ltTmhjQ0k2SWs5V1JWSlhVa2xVUlNKOVhTd2laWGh3SWpveE5qTTVNREF4TVRjeUxDSnBjM01pT2lKa2FXUTZhMlY1T25vMlRXdHFaR1pSVFhjelkxTmlVRWRpWmxFMU1uSmhSRVkxZEVSM1VYWkxlbGh4YjJKRlJWQkRiVzlxV2pFM2RpSXNJbTVpWmlJNk1UWXpPVEF3TVRFeE1pd2ljSEptSWpwYlhYMC5QSmY2OGhZbDBfSmFvTUNUa05JYXZUd3J4Qjk4aFJGb05oOGpXSDhyVzdyUUZtaGdlM1k0a2JYbnAwZ0xQR05CRlp6UWZnYmRVSGFTNnhaclRmQmRBZz09Il19.PJf68hYl0_JaoMCTkNIavTwrxB98hRFoNh8jWH8rW7rQFmhge3Y4kbXnp0gLPGNBFZzQfgbdUHaS6xZrTfBdAg=='
    decode({ target: { value: encodedUcan } })
  }

  const showNextProof = () => {
    if (decodedUcan?.payload.prf.length > 0) {
      encodedUcan = decodedUcan.payload.prf[0]
      decode({ target: { value: encodedUcan } })
    }
  }

  $: {
    if (decodedUcan) {
      ucan
        .validate(decodedUcan)
        .then(result => (validation = result))
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
      <Row>
        <Column>
          <h3>Encoded</h3>
        </Column>
      </Row>
      <Row padding>
        <Column>
          <div style="padding-bottom: 5px">Paste an encoded UCAN</div>
          <TextArea bind:value={encodedUcan} rows={14} on:input={decode} />
        </Column>
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
      {/if}
      {#if decodedUcan?.payload.prf.length > 0}
        <Row>
          <Column>
            <Button on:click={showNextProof}>Show Next Proof</Button>
          </Column>
        </Row>
      {/if}
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
                    <StructuredListCell>{row.value}</StructuredListCell>
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

  .validation-errors {
    width: 100%;
    padding: 5px 0 0 17px;
  }
</style>
