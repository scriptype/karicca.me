import { toDOM } from '../utils.js'
import { PostModel } from './model.js'
import {
  ContainerView,
  PostView,
  LoadingIndicatorView
} from './view.js'

const model = new PostModel({ pageSize: 10 })
const container = document.getElementById('posts-container')

const state = {
  windowHeight: Infinity,
  scrollHeight: Infinity
}

const treshold = 100
let counter = 0
const onScroll = (event) => {
  const scroll = document.documentElement.scrollTop
  const { scrollHeight, windowHeight } = state
  const { page } = model
  const scrolledEnough = scroll >= scrollHeight - windowHeight
  if (!page.loading && !page.reachedEnd && scrolledEnough) {
    renderNextPage()
  }
  if (!counter++ || (counter % treshold) === 0) {
    onResize()
  }
}

const onResize = (event) => {
  state.windowHeight = window.innerHeight
  state.scrollHeight = document.documentElement.scrollHeight
}

const renderNextPage = async () => {
  const loadingIndicator = toDOM(LoadingIndicatorView())
  container.appendChild(loadingIndicator)
  const nextPosts = await model.nextPage()
  loadingIndicator.remove()
  nextPosts.forEach(post => {
    const html = PostView( PostModel.serialize(post) )
    container.appendChild(toDOM(html))
  })
}

const render = async () => {
  const photoPosts = await model.fetch()
  const html = ContainerView(
    photoPosts.map( post => PostModel.serialize(post) )
  )
  container.innerHTML = html
  window.addEventListener('scroll', onScroll)
  window.addEventListener('resize', onResize)
}

export default Object.freeze({
  init: render
})
