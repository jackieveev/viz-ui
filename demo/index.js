// polyfill
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import Viz from '../src/index'
import './theme.scss'
import './style.scss'
import App from './App.vue'

Vue.use(Viz)

export default new Vue({
  render: h => h(App)
}).$mount('#app')