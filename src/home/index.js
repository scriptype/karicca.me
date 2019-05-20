import Tumblr from '../tumblr.js'
import { ContainerTemplate, PostTemplate } from './template.js'
import { PostModel } from './model.js'

const tumblrClient = new Tumblr({
  blogName: 'karicca',
  apiKey: 'rPSt5BHEMqYFbAR6UVccYzEiLXWw6CSE92RTWbz9QOUim6W7TQ'
})

const getPhotoPosts = async () => {
  const response = await tumblrClient.fetchPosts({
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
