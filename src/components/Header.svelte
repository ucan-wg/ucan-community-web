<script lang="ts">
  import {
    SkipToContent,
    Header,
    HeaderActionLink,
    HeaderUtilities
  } from 'carbon-components-svelte'
  import LogoGithub20 from 'carbon-icons-svelte/lib/LogoGithub20'
</script>

<Header company="UCAN" platformName="Distributed Auth" href="/">
  <div slot="skip-to-content">
    <SkipToContent />
  </div>
  <HeaderUtilities>
    <HeaderActionLink
      aria-label="GitHub Repository"
      icon={LogoGithub20}
      href="https://github.com/ucan-wg/ucan-check"
      target="_blank"
    />
  </HeaderUtilities>
</Header>

<style>
</style>
