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
  let buildDocOutline = (selector : string) => { return  ( selector.length === 0 ) || false }
  let isMobileDevice: boolean
  // let deviceType: string

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
      let headers = []

      function createMenuEntry(element : HTMLElement) {
        let span = document.createElement('span')
        span.textContent = element.textContent
        span.className = 'bx--side-nav__link-text'

        let link = document.createElement('a')
        link.className = 'bx--side-nav__link'
        link.href = `#${element.id}`
        link.appendChild(span)

        let item = document.createElement('li')
        item.className = 'bx--side-nav__menu-item'
        item.appendChild(link)

        return item
      }

      function formatId(content : string) {
        return content.replace(/[\s]/g, '-').toLowerCase().trim()
      }

      document.querySelectorAll(`${selector} > *`).forEach((el) => {
        if (el.tagName.toLowerCase().startsWith('h')) {
          el.id = formatId(el.textContent)
          headers.push(el)
        }
      })

      let subMenu = document.querySelector('.bx--side-nav__submenu')

      if (subMenu) {
        console.log('Menu!', subMenu)
        let next = subMenu.nextElementSibling
        console.log('next!', next)

        headers.forEach(item => {
          console.log('item!', item)
          let _el = createMenuEntry(item)
          console.log(_el)
          next.appendChild(_el)
        })

        // console.log(headers)

      }
      
      return true
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
      <!-- <SideNavMenuItem text="Intro" href="#intro"/> -->
    </SideNavMenu>
  </SideNavItems>
</SideNav>

<style>
</style>
