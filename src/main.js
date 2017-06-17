// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import '../static/pwacompat.min.js'
import '../static/material.min.js'

const App = resolve => {
  require.ensure(['./App'], () => {
    resolve(require('./App'))
  })
}

import VueFire from 'vuefire'
import VueTimeago from 'vue-timeago'

Vue.config.productionTip = false

Vue.use(VueFire)

Vue.use(VueTimeago, {
  name: 'timeago',
  locale: 'en-US',
  locales: {
    'en-US': require('vue-timeago/locales/en-US.json')
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
