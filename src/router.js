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
      path: '/date',
      name: 'date',
      component: () => import(/* webpackChunkName: "about" */ './views/date.vue')
    },
    {
      path: '/radio',
      name: 'radio',
      component: () => import(/* webpackChunkName: "about" */ './views/radio.vue')
    },
    {
      path: '/Virtual',
      name: 'Virtual',
      component: () => import(/* webpackChunkName: "about" */ './views/Virtual.vue')
    },
    {
      path: '/filter',
      name: 'filter',
      component: () => import(/* webpackChunkName: "about" */ './views/analyse/filter.vue')
    },
    {
      path: '/chartOption',
      name: 'chartOption',
      component: () => import(/* webpackChunkName: "about" */ './views/analyse/chart.vue')
    },
    {
      path: '/chart',
      name: 'chart',
      component: () => import(/* webpackChunkName: "about" */ './views/chart.vue')
    },
    {
      path: '/view',
      name: 'view',
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
      path: '/board',
      name: 'board',
      component: () => import(/* webpackChunkName: "about" */ './views/visualization/board.vue')
    },
    {
      path: '/saleOrder',
      name: 'saleOrder',
      component: () => import(/* webpackChunkName: "about" */ './views/visualization/saleOrder.vue')
    },
    {
      path: '/default',
      name: 'default',
      component: () => import(/* webpackChunkName: "about" */ './views/visualization/default.vue')
    },
    {
      path: '/menology',
      name: 'menology',
      component: () => import(/* webpackChunkName: "about" */ './components/index.vue')
    },
    {
      path: '/excel',
      name: 'excel',
      component: () => import(/* webpackChunkName: "about" */ './views/excel.vue')
    }
  ]
})
