import { InfoView } from './view.js'
import { InfoModel } from './model.js'

const model = new InfoModel()

const render = (container, data) => {
  container.innerHTML = InfoView(data)
}

const init = async () => {
  const container = document.getElementById('info-container')
  await model.fetch({ lazy: true })
  render(container, model.serialize())
}

export default Object.freeze({
  init
})
