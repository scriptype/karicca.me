import Tumblr from '../tumblr.js'
import config from '../config.js'
import { PostModel } from '../post/model.js'

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

  async fetch({ lazy } = {}) {
    if (lazy && this.posts.length) {
      return Promise.resolve(this.posts)
    }
    this.page.loading = true
    const response = await tumblrClient.getPosts({
      tag: 'portfolio',
      limit: this.page.size,
      offset: this.page.current * this.page.size
    })
    const data = await response.json()
    const baseIndex = this.page.current * this.page.size
    const posts = data.response.posts.map((post, index) =>
      new PostModel(post, baseIndex + index)
    )
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
