import Parallax from '../components/parallax/viewmodel.js'
import { InfoView } from './view.js'
import { InfoModel } from './model.js'
import config from '../config.js'

const model = new InfoModel()

const render = (container, parallaxLayers, info) => {
  const parallaxId = 'info-parallax'
  const parallaxSettings = {
    layers: parallaxLayers,
    id: parallaxId
  }
  container.innerHTML = InfoView({ parallaxSettings, info })
  Parallax.init(parallaxId)
}

const init = async () => {
  const container = document.getElementById('info-container')
  await model.fetch({ lazy: true })
  render(container, config.parallaxLayers, model.serialize())
}

export default Object.freeze({
  init
})
