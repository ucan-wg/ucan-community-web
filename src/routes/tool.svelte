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
  import { onMount } from 'svelte'

  import type { Ucan } from 'ucans'
  import type { Validation } from '$lib/ucan'

  import * as explantion from '$lib/explanation'
  import * as ucan from '$lib/ucan'
  import { formatDate, formatJson } from '$lib/utils'

  let setDevice = () => {}

  let encodedUcan: string = ''
  let decodedUcan: Ucan | null = null
  let validation: Validation | null = null
  let isMobileDevice: boolean

  onMount(() => {
    setDevice = () => {
      if (window.innerWidth >= 1025) {
        isMobileDevice = false
      } else {
        isMobileDevice = true
      }
    }

    setDevice()
  })

  const decode = event => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    encodedUcan = event.target.value.trim()
    decodedUcan = ucan.decode(encodedUcan)
  }

  const showExample = () => {
    encodedUcan =
      'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCIsInVjdiI6IjAuNy4wIn0=.eyJhdWQiOiJkaWQ6a2V5Ono2TWt0WVVycTNLZkplUzZVd1VIWUhkTFM2NGQxek5GVFI2dDUxWnBwMWV3WnVOcyIsImF0dCI6W3sid25mcyI6ImRlbW91c2VyLmZpc3Npb24ubmFtZS9wdWJsaWMvcGhvdG9zLyIsImNhcCI6Ik9WRVJXUklURSJ9XSwiZXhwIjoyNjM3MjUyNzc0LCJpc3MiOiJkaWQ6a2V5Ono2TWtzdWhjcXVXeHR5cndMbTZ1WXJNOU1hSE5UQ01qTmRWa3R0YjFvTXF3cnA0SyIsIm5iZiI6MTYzNzI1MjcxNCwicHJmIjoiZXlKaGJHY2lPaUpGWkVSVFFTSXNJblI1Y0NJNklrcFhWQ0lzSW5WamRpSTZJakF1Tnk0d0luMD0uZXlKaGRXUWlPaUprYVdRNmEyVjVPbm8yVFd0emRXaGpjWFZYZUhSNWNuZE1iVFoxV1hKTk9VMWhTRTVVUTAxcVRtUldhM1IwWWpGdlRYRjNjbkEwU3lJc0ltRjBkQ0k2VzNzaWQyNW1jeUk2SW1SbGJXOTFjMlZ5TG1acGMzTnBiMjR1Ym1GdFpTOXdkV0pzYVdNdmNHaHZkRzl6THlJc0ltTmhjQ0k2SWs5V1JWSlhVa2xVUlNKOVhTd2laWGh3SWpveU5qTTNNalV5TnpjMExDSnBjM01pT2lKa2FXUTZhMlY1T25vMlRXdHJXbUoxVUhSQ2IyMVNaMFJOUVUxWVRESnVTREUzUm1wb1dtVlFSMlUxVTBSVVdUSldhbnBCYVVWUVZ5SXNJbTVpWmlJNk1UWXpOekkxTWpjeE5Dd2ljSEptSWpwdWRXeHNmUT09Ll9kZXpRNVdVRjNkTXpKODNHQnktY2RqZExXUnJrUTNLMzBxODhjMFRQVVpLajJCX0lGYXdYbUFaR2lGRjZBX0ZNcE5fbGg0R0xiVmJybDhPZzF4OENnPT0ifQ==.TN0sO-5no3F0pNkPksWh5RdWQrfz3nZaQzwBMjHkKnSpzfC4b5vrYU8nozU9DmzQMNUZ9fUO888DznuIQEagDQ=='
    decode({ target: { value: encodedUcan } })
  }

  const showInvalidExample = () => {
    encodedUcan =
      'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCIsInVjdiI6IjAuNy4wIn0=.eyJhdWQiOiJkaWQ6a2V5Ono2TWtzaExTcUNvbjFNcTVZNll3TTRoSDJpUmNwbnpUWHA5V0Z4cGhvM2Rlc25IYiIsImF0dCI6W3sid25mcyI6ImRlbW91c2VyLmZpc3Npb24ubmFtZS9wdWJsaWMvcGhvdG9zLyIsImNhcCI6Ik9WRVJXUklURSJ9XSwiZXhwIjoxNjM3MTc0NDc4LCJpc3MiOiJkaWQ6a2V5Ono2TWtzaExTcUNvbjFNcTVZNll3TTRoSDJpUmNwbnpUWHA5V0Z4cGhvM2Rlc25IYiIsIm5iZiI6MTYzNzE3NDQxOCwicHJmIjoiZXlKaGJHY2lPaUpGWkVSVFFTSXNJblI1Y0NJNklrcFhWQ0lzSW5WamRpSTZJakF1Tnk0d0luMD0uZXlKaGRXUWlPaUprYVdRNmEyVjVPbm8yVFd0d2FVMDRkMU42UkhwWlkxZHFla3BCVVhKV2J6Vm9aM3BOYm5kQ1RGbDZWMlkwZWtacFRISldhVmx5VnlJc0ltRjBkQ0k2VzNzaWQyNW1jeUk2SW1SbGJXOTFjMlZ5TG1acGMzTnBiMjR1Ym1GdFpTOXdkV0pzYVdNdmNHaHZkRzl6THlJc0ltTmhjQ0k2SWs5V1JWSlhVa2xVUlNKOVhTd2laWGh3SWpveE5qTTNNVGMwTkRjNExDSnBjM01pT2lKa2FXUTZhMlY1T25vMlRXdGxjSGRXYlZGVVdtTmpZV1pvU0hGYVRtSlFaV1ZMWVZWT09GcDRjazVWT0RSTWVHdHBSbTl4UkRsak1TSXNJbTVpWmlJNk1UWXpOekUzTkRReE9Dd2ljSEptSWpwdWRXeHNmUT09LlBKZjY4aFlsMF9KYW9NQ1RrTklhdlR3cnhCOThoUkZvTmg4aldIOHJXN3JRRm1oZ2UzWTRrYlhucDBnTFBHTkJGWnpRZmdiZFVIYVM2eFpyVGZCZEFnPT0ifQ==.PJf68hYl0_JaoMCTkNIavTwrxB98hRFoNh8jWH8rW7rQFmhge3Y4kbXnp0gLPGNBFZzQfgbdUHaS6xZrTfBdAg=='
    decode({ target: { value: encodedUcan } })
  }

  const showNextProof = () => {
    if (decodedUcan?.payload.prf) {
      encodedUcan = decodedUcan.payload.prf
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
    (validation.validProof === true || validation.validProof === null)
</script>

<svelte:window on:resize={setDevice} />

<InlineNotification lowContrast kind="info" title="Hey there 👋">
  <div style="padding-top: 5px">
    You are using a preview version of UCAN Check. This version only supports
    the latest UCAN version. Try out our new
    <Link href="https://github.com/fission-suite/ucan" target="_blank">
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
    {#if decodedUcan?.payload.prf}
      <Row>
        <Column>
          <Button on:click={showNextProof}>Show Next Proof</Button>
        </Column>
      </Row>
    {/if}
  </Column>
  <Column padding>
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
                  The issuer cannot grant the capabilities listed in the
                  attenuation. The proof audience must match the issuer to
                  delegate capabilities.
                </ListItem>
              {/if}
              {#if validation.validProof === false}
                <ListItem>
                  UCAN proof is invalid. Select Show Next Proof to examine it.
                </ListItem>
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
                <StructuredListCell head>Value</StructuredListCell>
                <StructuredListCell head>Details</StructuredListCell>
              </StructuredListRow>
            </StructuredListHead>
            <StructuredListBody>
              {#each explantion.headerFields(decodedUcan) as row}
                <StructuredListRow>
                  <StructuredListCell noWrap>{row.field}</StructuredListCell>
                  <StructuredListCell noWrap>{row.longName}</StructuredListCell>
                  <StructuredListCell>{row.value}</StructuredListCell>
                  <StructuredListCell>
                    {row.details}
                  </StructuredListCell>
                </StructuredListRow>
              {/each}
              {#each explantion.payloadFields(decodedUcan) as row}
                <StructuredListRow>
                  <StructuredListCell noWrap>{row.field}</StructuredListCell>
                  <StructuredListCell noWrap>{row.longName}</StructuredListCell>
                  <StructuredListCell>{row.value}</StructuredListCell>
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
  .validation-errors {
    width: 100%;
    padding: 5px 0 0 17px;
  }
</style>
