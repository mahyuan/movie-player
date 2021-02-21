import { /* createWebHistory,  */createWebHashHistory, createRouter } from 'vue-router'
import NProgress from 'nprogress' // Progress 进度条

const routes = [

  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import('@/views/detail/index.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: {
      template: '<p>Page Not Found</p>'
    }
  }
]

const router = createRouter({
  // history: createWebHistory(import.meta.env.VITE_BASE),
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})
router.afterEach(route => {
  NProgress.done()
})
export default router
