import Vue from 'vue'
import Router from 'vue-router'

const MainFeed = resolve => {
  require.ensure(['@/components/MainFeed'], () => {
    resolve(require('@/components/MainFeed'))
  })
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainFeed',
      component: MainFeed
    }
  ]
})
