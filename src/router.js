import Backbone from 'backbone'

const Router = Backbone.Router.extend({
  routes: {
    'post/:id': 'post',
  },

  post(id) {
    console.log('post', id)
  }
})

export default new Router()

Backbone.history.start()
