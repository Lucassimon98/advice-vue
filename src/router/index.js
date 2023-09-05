import { createRouter, createWebHistory } from 'vue-router'
import CreateUserView from '../views/CreateUser.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {   
      path: '/advices/create',
      name: 'userAdviceCreate',
      component: CreateUserView
    }
  ]
})

export default router
