import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EditViewVue from '@/views/EditView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'todos',
      component: HomeView
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: EditViewVue
    },
  ]
})

export default router
