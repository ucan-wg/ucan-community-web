<script lang="ts">
  import {
    SkipToContent,
    Header,
    HeaderActionLink,
    HeaderUtilities,
    HeaderNav,
    HeaderNavItem,
    SideNav,
    SideNavItems,
    SideNavLink
  } from 'carbon-components-svelte'
  import LogoGithub20 from 'carbon-icons-svelte/lib/LogoGithub20'

  let isSideNavOpen = false
</script>

<Header company="UCAN" platformName="Distributed Auth" href="/" bind:isSideNavOpen>
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

<SideNav bind:isOpen={isSideNavOpen}>
  <SideNavItems>
    <SideNavLink href="/" text="Introduction" />
    <SideNavLink href="/tool" text="UCAN Tool" />
    <SideNavLink href="/docs" text="Docs" />
    <SideNavLink href="/community" text="Community" />
    <SideNavLink href="/about" text="About" />
  </SideNavItems>
</SideNav>

<style></style>
