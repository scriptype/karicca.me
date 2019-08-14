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
  }, index) {
    this.data = data
    this.index = index
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

  getFallbackThumbnail() {
    const photo = this.data.photos[0]
    if (this.index === 0 || (this.index + 1) % 9 === 0) {
      return photo.original_size.url
    }
    return this.getThumbnail(400)
  }

  getThumbnail(size) {
    const photo = this.data.photos[0]
    const thumbnail = photo.alt_sizes.find(alt => alt.width === size)
    if (thumbnail) {
      return thumbnail.url
    }
    return photo.alt_sizes.filter(alt => alt.width < size)[0].url
  }

  serialize() {
    switch (this.type) {
      case 'photo':
        return {
          id: this.data.id,
          type: this.data.type,
          permalink: this.data.post_url,
          title: this.data.caption ? toDOM(this.data.caption).innerText : '',
          fallbackThumbnail: this.getFallbackThumbnail(),
          highResThumbnailUrl: this.data.photos[0].original_size.url,
          getThumbnail: this.getThumbnail.bind(this),
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
