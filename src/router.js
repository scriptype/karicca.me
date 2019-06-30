import Backbone from 'backbone'
import Info from './info/viewmodel.js'
import Posts from './posts/viewmodel.js'
import Post from './post/viewmodel.js'

const Router = Backbone.Router.extend({
  routes: {
    '': 'home',
    'works': 'works',
    'post/:id': 'post',
  },

  home() {
    Post.destroy()

    Info.init()
    Posts.init()
  },

  works() {
    Post.destroy()

    Info.init({ skipToWorks: true })
    Posts.init()
  },

  post(id) {
    Post.init(id)
  }
})

const router = new Router()
Backbone.history.start()

router.on('route:post', id => {
  Post.onClose(() => {
    window.history.back()
  })
})

export default router
