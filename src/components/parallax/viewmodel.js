const addEventListeners = () => {
  const dom = document.documentElement
  window.addEventListener('scroll', () => {
    requestAnimationFrame(_ => {
      const scrollTop = dom.scrollTop || document.body.scrollTop
      dom.style.setProperty('--scrollTop', scrollTop + 'px')
    })
  })
}

const settings = {
  id: ''
}

const getContainer = () => {
  return document.getElementById(settings.id)
}

const getHeight = () => {
  return getContainer().getBoundingClientRect().height
}

const init = (id = 'parallax-container') => {
  settings.id = id
  const container = getContainer()
  container.style.cssText += `
    height: ${window.innerHeight}px;
  `
  addEventListeners()
}

export default Object.freeze({
  init,
  getHeight,
  getContainer
})
