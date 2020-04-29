import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/product',
      name: 'product',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/product.vue')
    },
    {
      path: '/sale',
      name: 'sale',
      component: () => import(/* webpackChunkName: "about" */ './views/sale.vue')
    },
    {
      path: '/radio',
      name: 'radio',
      component: () => import(/* webpackChunkName: "about" */ './views/radio.vue')
    },
    {
      path: '/anlysise',
      name: 'anlysise',
      component: () => import(/* webpackChunkName: "about" */ './views/anlysise.vue')
    },
    {
      path: '/chart',
      name: 'chart',
      component: () => import(/* webpackChunkName: "about" */ './views/view.vue')
    },
    {
      path: '/timer',
      name: 'timer',
      component: () => import(/* webpackChunkName: "about" */ './views/timer.vue')
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import(/* webpackChunkName: "about" */ './views/calendar.vue')
    },
    {
      path: '/example',
      name: 'example',
      component: () => import(/* webpackChunkName: "about" */ './views/example.vue')
    },
    {
      path: '/roll',
      name: 'roll',
      component: () => import(/* webpackChunkName: "about" */ './views/roll.vue')
    },
    {
      path: '/table',
      name: 'table',
      component: () => import(/* webpackChunkName: "about" */ './views/table.vue')
    },
    {
      path: '/sheet',
      name: 'sheet',
      component: () => import(/* webpackChunkName: "about" */ './views/visualization/sheet.vue')
    },
    {
      path: '/board',
      name: 'board',
      component: () => import(/* webpackChunkName: "about" */ './views/visualization/board.vue')
    },
    {
      path: '/target',
      name: 'target',
      component: () => import(/* webpackChunkName: "about" */ './views/visualization/target.vue')
    },
    {
      path: '/provider',
      name: 'provider',
      component: () => import(/* webpackChunkName: "about" */ './views/visualization/provider.vue')
    },
    {
      path: '/saleBoard',
      name: 'saleBoard',
      component: () => import(/* webpackChunkName: "about" */ './views/visualization/saleBoard.vue')
    },
    {
      path: '/saleOrder',
      name: 'saleOrder',
      component: () => import(/* webpackChunkName: "about" */ './views/visualization/saleOrder.vue')
    },
    {
      path: '/menology',
      name: 'menology',
      component: () => import(/* webpackChunkName: "about" */ './components/index.vue')
    }
  ]
})
