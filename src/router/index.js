import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import AddEvent from '../views/AddEvent.vue'
// import SignUp from '../views/SignUp.vue'
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/home',
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      allowUnauth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      allowUnauth: true,
    },
  },
  {
    path: '/addevent',
    name: 'addevent',
    component: AddEvent,
  },
  // {
  //   path: '/sign-up',
  //   name: 'signup',
  //   component: SignUp,
  // },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requiresAuth = to.matched.some(record => !record.meta.allowUnauth)

  if (requiresAuth && !currentUser) next('login')
  else next()
})

export default router
