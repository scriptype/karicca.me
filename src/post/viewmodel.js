import { LoadingPostView, PostView } from './view'
import { PostModel } from './model'
import router from '../router'

const model = new PostModel()

const init = async (postId) => {
  const container = document.getElementById('post-container')
  container.classList.add('visible')
  container.innerHTML = LoadingPostView()

  await model.fetch(postId)

  container.innerHTML = PostView( model.serialize() )
  const closePostButton = document.getElementById('close-post-button')
  closePostButton.addEventListener('click', () => {
    router.navigate('', { trigger: true })
  })
}

const destroy = () => {
  const container = document.getElementById('post-container')
  container.classList.remove('visible')
}

export default Object.freeze({
  init,
  destroy
})
