import { InfoView } from './view.js'
import { InfoModel } from './model.js'

const render = (container, data) => {
  container.innerHTML = InfoView(data)
}

const init = async () => {
  const container = document.getElementById('info-container')
  const model = new InfoModel()
  await model.fetch()
  render(container, model.serialize())
}

export default Object.freeze({
  init
})
