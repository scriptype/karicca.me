import { LoadingPostView, PostView, FullImageView } from './view'
import { PostModel } from './model'
import { toDOM } from '../utils'
import router from '../router'

const model = new PostModel()
const container = document.getElementById('post-container')
const IS_SHOWING_LARGER_IMAGE = 'is-showing-larger-image'
let fullImageContainer
let onCloseCallback

const addEventListeners = () => {
  const closePostButton = document.getElementById('close-post-button')
  closePostButton.addEventListener('click', closePost)

  window.addEventListener('keyup', onKeyUp)

  const imagesQuery = 'a[href*="tumblr"] img[src*="tumblr"]'
  const images = container.querySelectorAll(imagesQuery)
  images.forEach(image => {
    image.addEventListener('click', e => {
      e.preventDefault()
      e.stopPropagation()
      showFullImage(image)
    })
  })
}

const showFullImage = (image) => {
  container.classList.add(IS_SHOWING_LARGER_IMAGE)
  fullImageContainer = toDOM(FullImageView(image))
  container.appendChild(fullImageContainer)
  fullImageContainer.addEventListener('click', closeLargerImage)
}

const closeLargerImage = () => {
  container.classList.remove(IS_SHOWING_LARGER_IMAGE)
  fullImageContainer.remove()
}

const closePost = () => {
  if (onCloseCallback) {
    onCloseCallback()
  } else {
    router.navigate('', { trigger: true })
  }
}

const onKeyUp = (event) => {
  // ESC
  if (event.which === 27 || event.keyCode === 27) {
    if (container.classList.contains(IS_SHOWING_LARGER_IMAGE)) {
      closeLargerImage()
    } else {
      closePost()
    }
  }
}

const onClose = (callback) => {
  onCloseCallback = callback
}

const init = async (postId) => {
  container.classList.add('visible')
  container.innerHTML = LoadingPostView()

  await model.fetch(postId)

  container.innerHTML = PostView( model.serialize() )
  addEventListeners()
  document.body.classList.add('no-scroll')
}

const destroy = () => {
  container.classList.remove('visible')
  document.body.classList.remove('no-scroll')
  window.removeEventListener('keyup', onKeyUp)
}

export default Object.freeze({
  init,
  destroy,
  onClose
})
