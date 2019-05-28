import { LoadingPostView, PostView } from './view'
import { PostModel } from './model'
import router from '../router'

const model = new PostModel()
const container = document.getElementById('post-container')

const init = async (postId) => {
  container.classList.add('visible')
  container.innerHTML = LoadingPostView()

  await model.fetch(postId)

  container.innerHTML = PostView( model.serialize() )
  const closePostButton = document.getElementById('close-post-button')
  closePostButton.addEventListener('click', () => {
    router.navigate('', { trigger: true })
  })
  document.body.classList.add('no-scroll')
}

const destroy = () => {
  container.classList.remove('visible')
  document.body.classList.remove('no-scroll')
}

export default Object.freeze({
  init,
  destroy
})
