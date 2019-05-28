import { LoadingPostView, PostView } from './view'
import { PostModel } from './model'
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
