import Tumblr from '../tumblr.js'
import config from '../config.js'
import { toDOM } from '../utils.js'
import { PostModel } from './model.js'
import {
  ContainerTemplate,
  PostTemplate,
  LoadingIndicatorTemplate
} from './template.js'

const tumblrClient = new Tumblr(config.tumblr)

const settings = {
  page: {
    loading: false,
    current: 0,
    size: 10,
    reachedEnd: false,
    next() {
      this.current++
    }
  },
  container: document.getElementById('posts-container'),
  windowHeight: Infinity,
  scrollHeight: Infinity
}

const getPhotoPosts = async () => {
  settings.page.loading = true
  const response = await tumblrClient.getPosts({
    type: 'photo',
    tag: 'portfolio',
    limit: settings.page.size,
    offset: settings.page.current * settings.page.size
  })
  const data = await response.json()
  settings.page.loading = false
  const posts = data.response.posts
  if (posts.length < settings.page.size) {
    settings.page.reachedEnd = true
  }
  return data.response.posts
}

const treshold = 100
let counter = 0
const onScroll = (event) => {
  const scroll = document.documentElement.scrollTop
  const { page, scrollHeight, windowHeight } = settings
  const scrolledEnough = scroll >= scrollHeight - windowHeight
  if (!page.loading && !page.reachedEnd && scrolledEnough) {
    renderNextPage()
  }
  if (!counter++ || (counter % treshold) === 0) {
    onResize()
  }
}

const onResize = (event) => {
  settings.windowHeight = window.innerHeight
  settings.scrollHeight = document.documentElement.scrollHeight
}

const renderNextPage = async () => {
  settings.page.next()
  const loadingIndicator = toDOM(LoadingIndicatorTemplate())
  settings.container.appendChild(loadingIndicator)
  const nextPosts = await getPhotoPosts()
  loadingIndicator.remove()
  nextPosts.forEach(post => {
    const html = PostTemplate(new PostModel(post))
    settings.container.appendChild(toDOM(html))
  })
}

const render = async () => {
  const photoPosts = await getPhotoPosts()
  const html = ContainerTemplate(photoPosts.map(post => new PostModel(post)))
  settings.container.innerHTML = html
  window.addEventListener('scroll', onScroll)
  window.addEventListener('resize', onResize)
}

export default Object.freeze({
  init: render
})
