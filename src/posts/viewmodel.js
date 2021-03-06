import { toDOM } from '../utils.js'
import router from '../router'
import { PostCollection } from './model.js'
import {
  ContainerView,
  PostThumbnailView,
  LoadingIndicatorView,
  ReachedEndView
} from './view.js'

const collection = new PostCollection({ pageSize: 10 })
const container = document.getElementById('posts-container')
let initialized = false

const state = {
  windowHeight: Infinity,
  scrollHeight: Infinity
}

const treshold = 100
let counter = 0
const onScroll = (event) => {
  const scroll = document.documentElement.scrollTop || document.body.scrollTop
  const { scrollHeight, windowHeight } = state
  const { page } = collection
  const scrolledEnough = scroll >= scrollHeight - windowHeight * 2
  if (!page.loading && !page.reachedEnd && scrolledEnough) {
    renderNextPage().then(onResize)
  }
  if (!counter++ || (counter % treshold) === 0) {
    onResize()
  }
}

const onResize = (event) => {
  state.windowHeight = window.innerHeight
  state.scrollHeight = document.documentElement.scrollHeight
}

const onClickPost = (event) => {
  event.preventDefault()
  router.navigate(`post/${event.target.dataset.linkedPost}`, { trigger: true })
}

const renderNextPage = async () => {
  const loadingIndicator = toDOM(LoadingIndicatorView())
  container.appendChild(loadingIndicator)
  const nextPosts = await collection.nextPage()
  loadingIndicator.remove()
  const postsList = container.querySelector('#posts')
  nextPosts.forEach(post => {
    const html = PostThumbnailView( post.serialize() )
    const childNode = toDOM(html)
    postsList.appendChild(childNode)
    childNode
      .querySelector('[data-linked-post]')
      .addEventListener('click', onClickPost)
  })
  if (collection.page.reachedEnd) {
    container.appendChild(toDOM(ReachedEndView()))
  }
}

const render = async () => {
  if (initialized) {
    return
  }
  container.innerHTML = ContainerView([])
  const posts = await collection.fetch({ lazy: true })
  const html = ContainerView(
    posts.map( post => post.serialize() )
  )
  container.innerHTML = html
  window.addEventListener('scroll', onScroll)
  window.addEventListener('resize', onResize)
  container.querySelectorAll('[data-linked-post]').forEach(anchor => {
    anchor.addEventListener('click', onClickPost)
  })
  initialized = true
}

export default Object.freeze({
  init: render
})
