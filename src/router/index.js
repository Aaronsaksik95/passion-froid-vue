import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AddImage from '../views/AddImage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/addImage',
    name: 'AddImage',
    component: AddImage
  }
]

const router = new VueRouter({
  routes
})

export default router
