import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainLayout from "@/layouts/MainLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import Login from "@/views/auth/Login.vue";
import Project from "@/views/project/index.vue";
import Form from "@/views/form/index.vue";
import FormDetail from "@/views/form/detail.vue";
import Request from "@/views/request/index.vue";
import {useUserStore} from "@/stores/user"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'Auth',
      component: AuthLayout,
      children:[
        {
          path: '/login',
          name: 'Login',
          component:Login
        }
      ]
    },
    {
      path: '/',
      name: 'Main',
      component: MainLayout,
      children:[
        {
          path: '/',
          name: 'Home',
          component:HomeView
        },
        {
          path: '/form',
          name: 'Form',
          component:Form
        },
        {
          path: '/form/:id',
          name: 'Form_Detail',
          component:FormDetail
        },
        {
          path: '/request',
          name: 'Request',
          component:Request
        }
      ]
    },
  ]
})
router.beforeEach((to, from, next) => {
  const user = localStorage.getItem('user')
  if (to.name !== 'Login' && !user) {
    next('/login')
  }else next()

})
export default router

