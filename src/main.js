import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import './plugins/vuetify'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import './registerServiceWorker'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import firebase from 'firebase'
import VueAlertify from 'vue-alertify'
import VCalendar from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'
import Vuelidate from 'vuelidate'
import './plugins/bootstrap-vue'

Vue.config.productionTip = false

Vue.use(VueAlertify)

Vue.use(Vuelidate)

Vue.use(VCalendar, {
  firstDayOfWeek: 2,  // Monday
})

const config = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID
};

firebase.initializeApp(config)

var typeLineItems = []
firebase.firestore()
  .collection('typeLine')
  .onSnapshot(typeLines => {
    typeLineItems = []
    typeLines.forEach(typeLine => {
        typeLineItems.push(typeLine.data().name)
    })
    store.commit('setTypeLine', typeLineItems)
  })

var requestsItems = []
firebase.firestore()
  .collection('optionsRequests')
  .onSnapshot(optionsRequests => {
    optionsRequests.forEach(request => {
      requestsItems.push(request.data())
    })
    store.commit('setOptionsRequests', requestsItems)
  })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
