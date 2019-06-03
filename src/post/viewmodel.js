import { LoadingPostView, PostView, FullImageView } from './view'
import { PostModel } from './model'
import { toDOM } from '../utils'
import router from '../router'

const model = new PostModel()
const container = document.getElementById('post-container')
let onCloseCallback

const addEventListeners = () => {
  const closePostButton = document.getElementById('close-post-button')
  closePostButton.addEventListener('click', () => {
    if (onCloseCallback) {
      onCloseCallback()
    } else {
      router.navigate('', { trigger: true })
    }
  })

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
  container.classList.add('is-showing-larger-image')
  const fullImageContainer = toDOM(FullImageView(image))
  container.appendChild(fullImageContainer)
  fullImageContainer.addEventListener('click', e => {
    container.classList.remove('is-showing-larger-image')
    fullImageContainer.remove()
  })
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
}

export default Object.freeze({
  init,
  destroy,
  onClose
})
