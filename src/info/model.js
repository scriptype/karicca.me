import Tumblr from '../tumblr.js'
import config from '../config.js'

const tumblrClient = new Tumblr(config.tumblr)

export class InfoModel {
  constructor() {
    this.data = {}
  }

  serialize() {
    return {
      title: this.data.title,
      description: this.data.description,
      tumblrBlogUrl: this.data.url
    }
  }

  async fetch({ lazy } = {}) {
    if (lazy && Object.keys(this.data).length) {
      return Promise.resolve(this)
    }
    const response = await tumblrClient.getInfo()
    const data = await response.json()
    Object.assign(this.data, data.response.blog)
    return this
  }
}
