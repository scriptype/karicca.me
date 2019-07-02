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
      tumblrBlogUrl: this.data.url,
      pageLinks: this.data.pageLinks.map(page => new PageLinkModel(page))
    }
  }

  async fetch({ lazy } = {}) {
    if (lazy && Object.keys(this.data).length) {
      return Promise.resolve(this)
    }
    const info = await tumblrClient.getInfo()
    const infoData = await info.json()
    const pages = await tumblrClient.getPosts({ tag: 'page' })
    const pagesData = await pages.json()
    Object.assign(this.data, {
      ...infoData.response.blog,
      pageLinks: pagesData.response.posts
    })
    return this
  }
}

export class PageLinkModel {
  constructor(data = {}) {
    this.data = data
  }

  serialize() {
    return {
      type: this.data.type,
      text: this.data.title,
      href: this.data.post_url
    }
  }
}
