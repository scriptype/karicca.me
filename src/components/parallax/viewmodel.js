const addEventListeners = () => {
  const dom = document.documentElement
  window.addEventListener('scroll', () => {
    requestAnimationFrame(_ => {
      const scrollTop = dom.scrollTop || document.body.scrollTop
      dom.style.setProperty('--scrollTop', scrollTop + 'px')
    })
  })
}

const init = (id = 'parallax-container') => {
  const container = document.getElementById(id)
  container.style.cssText += `
    height: ${window.innerHeight}px;
  `
  addEventListeners()
}

export default Object.freeze({
  init
})
