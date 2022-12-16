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

  import { route } from '$lib/nav_store'

  let setDevice = () => {
    return false
  }
  let isMobileDevice: boolean

  // XXX TODO: investigate how to derive this object from sveltekits internals?
  let siteNavMap = [
    { href: '/', label: 'Introduction' },
    { href: '/validator/', label: 'Validator' },
    { href: '/learn/', label: 'Learn' },
    { href: '/community/', label: 'Community' },
    { href: 'https://github.com/ucan-wg/spec', label: 'Spec', outbound: true },
    { href: '/about/', label: 'About' }
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
      {#if link.outbound}
        <HeaderNavItem href={link.href} text={link.label} target="_blank" />
      {:else}
        <HeaderNavItem href={link.href} text={link.label} />
      {/if}
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

{#if $route.pathname === '/validator/'}
  {#if isMobileDevice}
    <SideNav bind:isOpen={isSideNavOpen}>
      <SideNavItems>
        {#each siteNavMap as link}
          <SideNavLink href={link.href} text={link.label} />
        {/each}
      </SideNavItems>
    </SideNav>
  {/if}
{:else}
  // we are not on the validator tool page
  <SideNav bind:isOpen={isSideNavOpen}>
    <SideNavItems>
      {#if isMobileDevice}
        {#each siteNavMap as link}
          <SideNavLink href={link.href} text={link.label} />
        {/each}
        <SideNavDivider />
      {/if}
      <SideNavMenu text="On This Page" expanded={true} />
    </SideNavItems>
  </SideNav>
{/if}

<style>
</style>
