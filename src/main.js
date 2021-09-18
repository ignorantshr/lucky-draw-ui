import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Index from './components/index.vue'
import Draw from './components/Draw.vue'
import Prize from './components/Prize.vue'
import Prizes from './components/Prizes.vue'
import PrizePool from './components/PrizePool.vue'
import PrizePools from './components/PrizePools.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: 'prizes',
      component: Index,
      children: [
        {
          path: '/prizes',
          component: Prizes,
        },
        {
          path: '/pools',
          component: PrizePools,
        },
        {
          path: '/prize',
          component: Prize,
          props: route => ({
            id: route.query.id,
            addButtons: route.query.addButtons,
            updateButtons: route.query.updateButtons
          })
        },
        {
          path: '/pool',
          component: PrizePool,
          props: route => ({
            id: route.query.id,
            addButtons: route.query.addButtons,
            updateButtons: route.query.updateButtons
          })
        },
      ]
    },
    {
      path: '/draw',
      component: Draw,
      props:  route => ({
        id: route.query.id,
      })
    }
  ]
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
