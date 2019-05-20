export default class Tumblr {
  constructor(options) {
    this.apiKey = options.apiKey
    this.blogName = options.blogName
  }

  getBaseUrl(blogName) {
    return `https://api.tumblr.com/v2/blog/${blogName}.tumblr.com/posts`
  }

  fetchPosts({ type, limit, blogName, tag }) {
    const baseUrl = this.getBaseUrl(blogName || this.blogName)
    const params = [
      `limit=${limit}`,
      `api_key=${this.apiKey}`
    ]
    if (type) params.push(`type=${type}`)
    if (tag) params.push(`tag=${tag}`)
    const requestUrl = [ baseUrl, params.join('&') ].join('?')
    return fetch(requestUrl)
  }
}
