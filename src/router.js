import Backbone from 'backbone'
import config from './config.js'
import Info from './info/viewmodel.js'
import Posts from './posts/viewmodel.js'
import Post from './post/viewmodel.js'

const Router = Backbone.Router.extend({
  routes: {
    '': 'home',
    'post/:id': 'post',
    'about': 'about',
  },

  home() {
    Post.destroy()

    Info.init()
    Posts.init()
  },

  post(id) {
    Post.init(id)
  },

  about() {
    Post.init(config.aboutMePostId)
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
