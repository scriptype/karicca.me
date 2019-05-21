import Tumblr from '../tumblr.js'
import config from '../config.js'
import { InfoTemplate } from './template.js'
import { InfoModel } from './model.js'

const tumblrClient = new Tumblr(config.tumblr)

const getInfo = async () => {
  const response = await tumblrClient.getInfo()
  const data = await response.json()
  return data.response.blog
}

const render = (container, info) => {
  container.innerHTML = InfoTemplate(new InfoModel(info))
}

const init = async () => {
  const info = await getInfo()
  const container = document.getElementById('info-container')
  render(container, info)
}

export default Object.freeze({
  init
})
