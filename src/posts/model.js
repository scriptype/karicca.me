import { toDOM } from '../utils.js'

export class PostModel {
  constructor(post) {
    switch (post.type) {
      case 'photo':
        return {
          type: post.type,
          permalink: post.post_url,
          title: post.caption ? toDOM(post.caption).innerText : '',
          highResThumbnailUrl: post.photos[0].original_size.url
        }
    }
  }
}
