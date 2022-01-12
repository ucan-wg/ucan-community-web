function createMenuEntry(element) {
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

function formatId(content) {
  return content.replace(/[\s]/g, '-').toLowerCase().trim()
}

function reset(selector) {
  let _outlineElement = document.querySelector(selector);
  console.log(`Resetting ${_outlineElement}`)
  _outlineElement.innerHTML = ""
}

function build(selector) {

  let sel_sidemenu = '.bx--side-nav__menu'
  let subMenu = document.querySelector(sel_sidemenu)

  if (subMenu) {
    
    reset(sel_sidemenu)
    console.log('In build: ', selector);
    let headers = []
  
    // let selector = 'div.markdown-generated'
    document.querySelectorAll(`${selector} > *`).forEach((el) => {
      if (el.tagName.toLowerCase().startsWith('h')) {
        el.id = formatId(el.textContent)
        headers.push(el)
      }
    })

    console.log("headers", headers)


    console.log('Menu!', subMenu)

    headers.forEach(item => {
      let _el = createMenuEntry(item)
      subMenu.appendChild(_el)
    })
  }

  return true
}

export default build
