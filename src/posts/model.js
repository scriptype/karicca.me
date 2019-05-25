import Tumblr from '../tumblr.js'
import config from '../config.js'
import { toDOM } from '../utils.js'

const tumblrClient = new Tumblr(config.tumblr)

export class PostModel {
  constructor(options) {
    this.page = {
      loading: false,
      reachedEnd: false,
      current: 0,
      size: options.pageSize
    }
  }

  static serialize(post) {
    switch (post.type) {
      case 'photo':
        return {
          id: post.id,
          type: post.type,
          permalink: post.post_url,
          title: post.caption ? toDOM(post.caption).innerText : '',
          highResThumbnailUrl: post.photos[0].original_size.url,
          tags: post.tags
        }

      case 'text':
        return {
          type: post.type,
          permalink: post.post_url,
          title: post.title
        }
    }
  }

  async fetch() {
    this.page.loading = true
    const response = await tumblrClient.getPosts({
      tag: 'portfolio',
      limit: this.page.size,
      offset: this.page.current * this.page.size
    })
    const data = await response.json()
    const posts = data.response.posts
    if (posts.length < this.page.size) {
      this.page.reachedEnd = true
    }
    this.page.loading = false
    return data.response.posts
  }

  async nextPage() {
    this.page.current++
    return await this.fetch()
  }
}
