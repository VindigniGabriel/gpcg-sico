import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Register from '@/components/auth/Register.vue'
import Singin from '@/components/auth/Singin.vue'
import Add from '@/views/Add.vue'
import Settings from '@/views/Settings.vue'
import List from '@/views/List.vue'
import Quote from '@/views/Quote.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Singin',
      component: Singin
    },
    {
      path: '/add/:id',
      name: 'Add',
      component: Add
    },
    {
      path: '/settings/:id',
      name: 'Settings',
      component: Settings
    },
    {
      path: '/list/:id',
      name: 'List',
      component: List
    },
    {
      path: '/quote/:id',
      name: 'Quote',
      component: Quote
    }
  ]
})
