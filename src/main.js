import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
//import Icon from 'vue-awesome/components/Icon'
//import 'vue-awesome/icons/download'
import feather from 'vue-icon'
Vue.use(feather, 'v-icon')

//Vue.component('icon', Icon)

Vue.use(BootstrapVue)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
