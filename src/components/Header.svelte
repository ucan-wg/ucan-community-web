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
    SideNavLink,
    SideNavDivider,
    SideNavMenu,
    SideNavMenuItem
  } from 'carbon-components-svelte'

  import { onMount } from 'svelte'
  import LogoGithub20 from 'carbon-icons-svelte/lib/LogoGithub20'

  let isSideNavOpen = false

  let setDevice = () => { return false }
  let isMobileDevice: boolean
  let deviceType: string

  onMount(() => {
    setDevice = () => {
      console.log(`In setDevice: window.innerWidth is ${window.innerWidth}`)

      if (window.innerWidth < 1056) {
        isMobileDevice = true
      } else {
        isMobileDevice = false
      }

      isMobileDevice ? deviceType = `Mobile: ${window.innerWidth}px wide` : deviceType = `Desktop  ${window.innerWidth}px wide`
      return isMobileDevice
    }

    setDevice()
  })
</script>

<svelte:window on:resize={setDevice} />

<Header
  company="UCAN" 
  platformName="Distributed Auth" 
  href="/" 
  bind:isSideNavOpen
>
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
    {#if isMobileDevice}
      <SideNavLink href="/" text="Introduction" />
      <SideNavLink href="/tool" text="UCAN Tool" />
      <SideNavLink href="/docs" text="Docs" />
      <SideNavLink href="/community" text="Community" />
      <SideNavLink href="/about" text="About" />
      <SideNavDivider />
    {/if}
    
    <!-- TODO: figure out how to create this doc outline based on the headings -->
    <!-- / etc of the current page  -->
    <SideNavMenu text="On This Page" expanded={true}>
      <SideNavMenuItem text="Intro"/>
      <SideNavMenuItem text="Topic A"/>
      <SideNavMenuItem text="Topic B"/>
      <SideNavMenuItem text="Examples"/>
    </SideNavMenu>
  </SideNavItems>
</SideNav>

<style>
</style>
