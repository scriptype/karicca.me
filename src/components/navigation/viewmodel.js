const openMenu = () => {
  const container = document.getElementById('navigation-container')
  container.classList.add('is-open')
  document.body.classList.add('no-scroll')
}

const closeMenu = () => {
  const container = document.getElementById('navigation-container')
  container.classList.remove('is-open')
  document.body.classList.remove('no-scroll')
}

const addEventListeners = () => {
  const openBtn = document.getElementById('open-navigation-btn')
  const closeBtn = document.getElementById('close-navigation-btn')
  openBtn.addEventListener('click', openMenu)
  closeBtn.addEventListener('click', closeMenu)
}

const init = () => {
  addEventListeners()
}

export default Object.freeze({
  init
})
