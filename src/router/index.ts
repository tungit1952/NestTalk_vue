import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainLayout from "@/layouts/MainLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import Login from "@/views/auth/Login.vue";

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
        }
      ]
    },
  ]
})

export default router
