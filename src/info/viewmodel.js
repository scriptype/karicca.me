import Parallax from '../components/parallax/viewmodel.js'
import { InfoView } from './view.js'
import { InfoModel } from './model.js'
import config from '../config.js'

const model = new InfoModel()

const onClickSkipToWorks = (event) => {
  event.preventDefault()
  const worksTitle = document.getElementById('works')
  const position = worksTitle.getBoundingClientRect().top
  document.body.scrollTop = position
  document.documentElement.scrollTop = position
}

const addEventListeners = () => {
  const skipToWorksBtn = document.getElementById('skip-to-works-btn')
  skipToWorksBtn.addEventListener('click', onClickSkipToWorks)

  const dom = document.documentElement
  window.addEventListener('scroll', () => {
    requestAnimationFrame(_ => {
      const scrollTop = dom.scrollTop || document.body.scrollTop
      if (scrollTop + (window.innerHeight / 15) >= window.innerHeight) {
        dom.style.setProperty('--nav-color', 'black')
      } else {
        dom.style.setProperty('--nav-color', 'white')
      }
    })
  })
}

const init = async () => {
  const container = document.getElementById('info-container')
  await model.fetch({ lazy: true })
  const parallaxId = 'info-parallax'
  const parallaxSettings = {
    layers: config.parallaxLayers,
    id: parallaxId
  }
  const info = model.serialize()
  const navigationLinks = [
    ...info.pageLinks,
    ...config.socialMedia
  ]
  container.innerHTML = InfoView({ parallaxSettings, navigationLinks, info })
  Parallax.init(parallaxId)
  addEventListeners()
}

export default Object.freeze({
  init
})
