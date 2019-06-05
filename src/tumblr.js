export default class Tumblr {
  constructor(options) {
    this.apiKey = options.apiKey
    this.blogName = options.blogName
  }

  getBaseUrl(endpoint) {
    return `https://api.tumblr.com/v2/blog/${this.blogName}.tumblr.com/${endpoint}`
  }

  getPosts({ id, type, limit, offset, tag }) {
    const baseUrl = this.getBaseUrl('posts')
    const params = [
      `limit=${limit}`,
      `api_key=${this.apiKey}`
    ]
    if (id) params.push(`id=${id}`)
    if (type) params.push(`type=${type}`)
    if (tag) params.push(`tag=${tag}`)
    if (offset) params.push(`offset=${offset}`)
    const requestUrl = [ baseUrl, params.join('&') ].join('?')
    return fetch(requestUrl)
  }

  getPost({ id }) {
    return this.getPosts({ id })
  }

  getInfo() {
    const baseUrl = this.getBaseUrl('info')
    const params = [ `api_key=${this.apiKey}` ]
    const requestUrl = [ baseUrl, params.join('&') ].join('?')
    return fetch(requestUrl)
  }
}
