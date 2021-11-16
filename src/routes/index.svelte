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
  import { formatJson } from '$lib/util';

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
    'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCIsInVhdiI6IjAuNy4wIn0=.eyJhdWQiOiJkaWQ6a2V5Ono2TWtnWUdGM3RobjhrMUZ2NHA0ZFdYS3RzWENuTEg3cTl5dzRRZ05QVUxEbURLQiIsImF0dCI6W3sid25mcyI6ImRlbW91c2VyLmZpc3Npb24ubmFtZS9wdWJsaWMvcGhvdG9zLyIsImNhcCI6Ik9WRVJXUklURSJ9XSwiZXhwIjoxNjMyMjM5NTYwLCJpc3MiOiJkaWQ6a2V5Ono2TWtoQXFkeUxQVlBOcWRlSnJlUHpmeHZzZ2JndlNHdVNaR1BuWEFoTmpoTmJIVSIsIm5iZiI6MTYzMjIzOTQ3MCwicHJmIjoiZXlKaGJHY2lPaUpGWkVSVFFTSXNJblI1Y0NJNklrcFhWQ0lzSW5WaGRpSTZJakF1Tnk0d0luMD0uZXlKaGRXUWlPaUprYVdRNmEyVjVPbm8yVFd0b1FYRmtlVXhRVmxCT2NXUmxTbkpsVUhwbWVIWnpaMkpuZGxOSGRWTmFSMUJ1V0VGb1RtcG9UbUpJVlNJc0ltRjBkQ0k2VzNzaWQyNW1jeUk2SW1SbGJXOTFjMlZ5TG1acGMzTnBiMjR1Ym1GdFpTOXdkV0pzYVdNdmNHaHZkRzl6THlJc0ltTmhjQ0k2SWs5V1JWSlhVa2xVUlNKOVhTd2laWGh3SWpveE5qTXlNak01TlRZd0xDSnBjM01pT2lKa2FXUTZhMlY1T25vMlRXdG1abmQxVkc4MFRraHhaVmxrVTNSQlEyaHpZMDVqY0VkSWNsQmhORUZyY1c1VVRrZHplbHBGUkVzNFZDSXNJbTVpWmlJNk1UWXpNakl6T1RRM01Dd2ljSEptSWpwdWRXeHNmUT09LlUzX3A2UnVFYk14dzFFbkFsYzU0OERKSjItY2dZZGlPMXN5Z1dfeUpCYzhHUVVMeVM0S1haN05DMU0wUGNISkVfQTlVbmo3Uy0tcXdrbzVDdUFIUEFnPT0ifQ==.PJf68hYl0_JaoMCTkNIavTwrxB98hRFoNh8jWH8rW7rQFmhge3Y4kbXnp0gLPGNBFZzQfgbdUHaS6xZrTfBdAg==';
    decode({ target: { value: encodedUcan } });
  };

  const showNextProof = () => {
    if (decodedUcan?.payload.prf) {
      encodedUcan = decodedUcan.payload.prf;
      decode({ target: { value: encodedUcan } });
    }
  }

  $: {
    ucan
      .isValid(decodedUcan)
      .then(result => (isValid = result))
      .catch(() => (isValid = false));
  }
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
          <Button on:click={showExample}>Show Example UCAN</Button>
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
