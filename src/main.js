import Vue from 'vue'
import firebase from 'firebase'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
let app = null

// Initialize Firebase
var firebaseConfig = {
  apiKey: 'AIzaSyAwymTPUCNc0KS8pFwc9ZyIoeY7FUrBSW4',
  authDomain: 'crime-and-punishment-6e3e6.firebaseapp.com',
  databaseURL: 'https://crime-and-punishment-6e3e6.firebaseio.com',
  projectId: 'crime-and-punishment-6e3e6',
  storageBucket: 'crime-and-punishment-6e3e6.appspot.com',
  messagingSenderId: '964444430817',
  appId: '1:964444430817:web:8e0e1b74d371e79f86b2a0',
  measurementId: 'G-P9BZYBVZ7P',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App),
    }).$mount('#app')
  }
})
