export default class Tumblr {
  constructor(options) {
    this.apiKey = options.apiKey
    this.blogName = options.blogName
  }

  getBaseUrl(blogName, endpoint) {
    return `https://api.tumblr.com/v2/blog/${blogName}.tumblr.com/${endpoint}`
  }

  getPosts({ type, limit, blogName, tag }) {
    const baseUrl = this.getBaseUrl(blogName || this.blogName, 'posts')
    const params = [
      `limit=${limit}`,
      `api_key=${this.apiKey}`
    ]
    if (type) params.push(`type=${type}`)
    if (tag) params.push(`tag=${tag}`)
    const requestUrl = [ baseUrl, params.join('&') ].join('?')
    return fetch(requestUrl)
  }

  getInfo({ blogName } = {}) {
    const baseUrl = this.getBaseUrl(blogName || this.blogName, 'info')
    const params = [ `api_key=${this.apiKey}` ]
    const requestUrl = [ baseUrl, params.join('&') ].join('?')
    return fetch(requestUrl)
  }
}
