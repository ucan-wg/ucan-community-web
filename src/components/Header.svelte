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
  let buildDocOutline = (selector : string) => { return ( selector.length && selector.length > 0 ) }
  let isMobileDevice: boolean
  let deviceType: string

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

    // the start of a function that parses out header tags in the doc and builds a doc buildDocOutline.
    buildDocOutline = (selector) => {
      // let docRoot = document.querySelector(selector)

      // let selector = 'div.markdown-generated'
      // let docRoot = document.querySelector(sel)

      // let arr = [].slice.call(docRoot.childNodes)

      // let _map = arr.map((el) => {
      //   if (el.tagName && el.tagName[0].toLowerCase() === 'h') {
      //     return [el.tagName, el.textContent ]; 
      //   }
      //   else {
      //     return false
      //   }
      // })

      return ( selector.length && selector.length > 0 )
    }

    setDevice()
    buildDocOutline('div.markdown-generated')
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
      <SideNavMenuItem text="Intro"/>
      <SideNavMenuItem text="Topic A"/>
      <SideNavMenuItem text="Topic B"/>
      <SideNavMenuItem text="Examples"/>
    </SideNavMenu>
  </SideNavItems>
</SideNav>

<style>
</style>
