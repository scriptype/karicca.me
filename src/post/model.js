import Tumblr from '../tumblr.js'
import config from '../config.js'
import { toDOM } from '../utils.js'

const tumblrClient = new Tumblr(config.tumblr)

export class PostModel {
  constructor(data = {
    id: '',
    type: '',
    tags: [],
    title: '',
    caption: '',
    post_url: '',
    body: '',
    photos: []
  }) {
    this.data = data
  }

  async fetch(id) {
    const response = await tumblrClient.getPost({ id })
    const data = await response.json()
    this.data = data.response.posts[0]
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
          title: this.data.title,
          body: this.data.body.replace(/_(540|75|100|250|400|500).png/gi, '_1280.png')
        }
    }
  }
}
