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
    SideNavMenu
  } from 'carbon-components-svelte'

  import { onMount } from 'svelte'
  import LogoGithub20 from 'carbon-icons-svelte/lib/LogoGithub20'
  let isSideNavOpen = false

  let setDevice = () => { return false }
  // let buildDocOutline = (selector : string) => { return  ( selector.length === 0 ) || false }
  let isMobileDevice: boolean
  // let deviceType: string

  export let route : string
  export let hash : string

  let siteNavMap = [
    { href: '/', label: 'Introduction' },
    { href: '/validator', label: 'UCAN Validator' },
    { href: '/learn', label: 'Learn' },
    { href: '/community', label: 'Community' },
    { href: '/about', label: 'About' }
  ]

  onMount(() => {
    setDevice = () => {
      if (window.innerWidth < 1056) {
        isMobileDevice = true
      } else {
        isMobileDevice = false
      }
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
    {#each siteNavMap as link}
      <HeaderNavItem href="{link.href}" text="{link.label}" />
    {/each}
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
      {#each siteNavMap as link}
        <SideNavLink href="{link.href}" text="{link.label}" />
      {/each}
      <SideNavDivider />
    {/if}
    
    <!-- TODO: figure out how to create this doc outline based on the headings -->
    <!-- / etc of the current page  -->
    <SideNavMenu text="On This Page" expanded={true}>
      <!-- <SideNavMenuItem text="Intro" href="#intro"/> -->
    </SideNavMenu>
  </SideNavItems>
</SideNav>

<style>
</style>
