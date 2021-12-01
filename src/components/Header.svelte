<script lang="ts">
  import {
    SkipToContent,
    Header,
    HeaderActionLink,
    HeaderUtilities,
    HeaderNav,
    HeaderNavItem,
  } from 'carbon-components-svelte'
  import LogoGithub20 from 'carbon-icons-svelte/lib/LogoGithub20'
</script>

<Header company="UCAN" platformName="Distributed Auth" href="/">
  <div slot="skip-to-content">
    <SkipToContent />
  </div>
  <HeaderNav>
    <HeaderNavItem href="/" text="Introduction" />
    <HeaderNavItem href="/tool" text="UCAN Tool" />
    <HeaderNavItem href="/docs" text="Docs" />
    <HeaderNavItem href="/community" text="Community" />
    <HeaderNavItem href="/about" text="About" />
  </HeaderNav>
  <HeaderUtilities>
    <HeaderActionLink
      aria-label="GitHub Repository"
      icon={LogoGithub20}
      href="https://github.com/ucan-wg/ucan-check"
      target="_blank"
    />
  </HeaderUtilities>
</Header>

<style></style>
