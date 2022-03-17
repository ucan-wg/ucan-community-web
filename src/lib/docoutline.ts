function createMenuEntry(element: Element): HTMLLIElement {
  const span = document.createElement('span')
  span.textContent = element.textContent
  span.className = 'bx--side-nav__link-text'

  const link = document.createElement('a')
  link.className = 'bx--side-nav__link'
  link.href = `#${element.id}`
  link.appendChild(span)

  const item = document.createElement('li')
  item.className = 'bx--side-nav__menu-item'
  item.appendChild(link)
  return item
}

function formatId(content: string): string {
  return content.replace(/[\s]/g, '-').toLowerCase().trim()
}

function reset(selector: string): void {
  const _outlineElement = document.querySelector(selector)
  _outlineElement.innerHTML = ''
}

function build(selector: string): boolean {
  const sel_sidemenu = '.bx--side-nav__menu'
  const subMenu = document.querySelector(sel_sidemenu)

  if (subMenu) {
    reset(sel_sidemenu)
    const headers: Element[] = []
  
    document.querySelectorAll(`${selector} > *`).forEach((el) => {
      if (el.tagName.toLowerCase().startsWith('h')) {
        el.id = formatId(el.textContent)
        headers.push(el)
      }
    })

    headers.forEach(item => {
      const _el = createMenuEntry(item)
      subMenu.appendChild(_el)
    })
  }

  return true
}

export { build }