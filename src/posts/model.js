import Tumblr from '../tumblr.js'
import config from '../config.js'
import { toDOM } from '../utils.js'

const tumblrClient = new Tumblr(config.tumblr)

export class PostCollection {
  constructor(options) {
    this.page = {
      loading: false,
      reachedEnd: false,
      current: 0,
      size: options.pageSize
    }
    this.posts = []
  }

  async fetch() {
    this.page.loading = true
    const response = await tumblrClient.getPosts({
      tag: 'portfolio',
      limit: this.page.size,
      offset: this.page.current * this.page.size
    })
    const data = await response.json()
    const posts = data.response.posts.map(post => new PostModel(post))
    if (posts.length < this.page.size) {
      this.page.reachedEnd = true
    }
    this.page.loading = false
    this.posts.push(...posts)
    return posts
  }

  async nextPage() {
    this.page.current++
    return await this.fetch()
  }
}

export class PostModel {
  constructor(data = {}) {
    this.data = data
  }

  get type() {
    return this.data.type
  }

  getLinkedPostId() {
    const linkTag = this.data.tags.find(tag => tag.match('id:'))
    return linkTag ? linkTag.replace('id:', '') : null
  }

  serialize() {
    switch (this.type) {
      case 'photo':
        return {
          id: this.data.id,
          type: this.data.type,
          permalink: this.data.post_url,
          title: this.data.caption ? toDOM(this.data.caption).innerText : '',
          highResThumbnailUrl: this.data.photos[0].original_size.url,
          tags: this.data.tags,
          linkedPostId: this.getLinkedPostId()
        }

      case 'text':
        return {
          type: this.data.type,
          permalink: this.data.post_url,
          title: this.data.title
        }
    }
  }
}
