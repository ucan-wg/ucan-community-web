<script lang="ts">
  import {
    Button,
    CodeSnippet,
    Column,
    InlineNotification,
    Link,
    Row,
    StructuredList,
    StructuredListHead,
    StructuredListRow,
    StructuredListCell,
    StructuredListBody,
    TextArea
  } from 'carbon-components-svelte';

  import { onMount } from 'svelte';

  import type { Ucan } from 'ucans';
  import * as ucan from '$lib/ucan';

  let setDevice = () => {};

  let encodedUcan: string = '';
  let decodedUcan: Ucan | null = null;
  let isValid: boolean = false;
  let isMobileDevice: boolean;

  onMount(async () => {
    setDevice = () => {
      if (window.innerWidth >= 1025) {
        isMobileDevice = false;
      } else {
        isMobileDevice = true;
      }
    };

    setDevice();
  });

  const decode = event => {
    encodedUcan = event.target.value.trim();
    const result = ucan.decode(encodedUcan);

    if (result.ucan) {
      decodedUcan = result.ucan;
    } else {
      decodedUcan = null;
    }
  };

  const showExample = () => {
    encodedUcan =
      'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCIsInVhdiI6IjAuNy4wIn0=.eyJhdWQiOiJkaWQ6a2V5Ono2TWt2SmR2OFZaYjZoRWlxcktOWHJ4bm02bnJ5akZxVlVoUTd6aWdxTVF4d1doTCIsImF0dCI6W3sid25mcyI6ImRlbW91c2VyLmZpc3Npb24ubmFtZS9wdWJsaWMvcGhvdG9zLyIsImNhcCI6Ik9WRVJXUklURSJ9XSwiZXhwIjoxNjMyMTU3ODMwLCJpc3MiOiJkaWQ6a2V5Ono2TWtybUZTQkx5Q3V1M2hFMUNNeWpkbUZlYjlxMUduS0V4dWJLenNRMWE0Z2l4WCIsIm5iZiI6MTYzMjE1Nzc0MCwicHJmIjpudWxsfQ==.wTz81twQVFDZHN9kxXYIfNXKq7nEQztE6rKvRxnpJ58qvfDSRoYYr_mxJ1D8xzJMudsR9Bx-CjzlHGxI_IgzBg==';
    decode({ target: { value: encodedUcan } });
  };

  $: {
    ucan
      .isValid(decodedUcan)
      .then(result => (isValid = result))
      .catch(() => (isValid = false));
  }
</script>

<svelte:window on:resize={setDevice} />

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
          <Button on:click={showExample}>Show Example UCAN</Button>
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
          {JSON.stringify(decodedUcan?.header, null, 2) || ''}
        </CodeSnippet>
      </Column>
    </Row>
    <Row>
      <Column>
        <div style="padding-bottom: 5px">Payload</div>
        <CodeSnippet type="multi" hideCopyButton>
          {JSON.stringify(decodedUcan?.payload, null, 2) || ''}
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

{#if !isValid && encodedUcan !== ''}
  <Row>
    <Column>
      <InlineNotification
        kind="warning-alt"
        subtitle="Invalid UCAN. The UCAN may have a bad signature, impermissible attentuations, or it was encoded incorrectly."
        lowContrast
        hideCloseButton
      />
    </Column>
  </Row>
{/if}

<Row>
  <Column>
    {#await ucan.isValid(decodedUcan)}
      <span />
    {:then valid}
      {#if valid}
        <Row padding>
          <Column>
            <h3>Explanation</h3>
          </Column>
        </Row>
        <Row>
          <Column>
            Please see the
            <Link href="https://datatracker.ietf.org/doc/html/rfc7519" target="_blank">
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
                {#each ucan.headerFields(decodedUcan) as row}
                  <StructuredListRow>
                    <StructuredListCell noWrap>{row.field}</StructuredListCell>
                    <StructuredListCell noWrap
                      >{row.longName}</StructuredListCell
                    >
                    <StructuredListCell>{row.value}</StructuredListCell>
                    <StructuredListCell>
                      {row.details}
                    </StructuredListCell>
                  </StructuredListRow>
                {/each}
                {#each ucan.payloadFields(decodedUcan) as row}
                  <StructuredListRow>
                    <StructuredListCell noWrap>{row.field}</StructuredListCell>
                    <StructuredListCell noWrap
                      >{row.longName}</StructuredListCell
                    >
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
    {/await}
  </Column>
</Row>
