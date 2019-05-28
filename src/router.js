import Backbone from 'backbone'
import Info from './info/viewmodel.js'
import Posts from './posts/viewmodel.js'
import Post from './post/viewmodel.js'

const Router = Backbone.Router.extend({
  routes: {
    '': 'home',
    'post/:id': 'post',
  },

  home() {
    Post.destroy()

    Info.init()
    Posts.init()
  },

  post(id) {
    Post.init(id)
  }
})

const router = new Router()
Backbone.history.start()

export default router
