import Tumblr from '../tumblr.js'
import config from '../config.js'
import { ContainerTemplate, PostTemplate } from './template.js'
import { PostModel } from './model.js'

const tumblrClient = new Tumblr(config.tumblr)

const getPhotoPosts = async () => {
  const response = await tumblrClient.getPosts({
    type: 'photo',
    tag: 'portfolio',
    limit: 20
  })
  const data = await response.json()
  return data.response.posts
}

const render = (container, posts) => {
  container.innerHTML = ContainerTemplate(posts.map(post => new PostModel(post)))
}

const init = async () => {
  const photoPosts = await getPhotoPosts()
  const container = document.getElementById('posts-container')
  render(container, photoPosts)
}

export default Object.freeze({
  init
})
