import "babel-polyfill"
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from "fastclick"
import Mint from "mint-ui"
import "./common/stylus/index.styl"
import "mint-ui/lib/style.css"
import VueLazyload from "vue-lazyload"
import store from "./store/index.js"
import "./assets/animate.css"
Vue.use( Mint );
Vue.use( VueLazyload,{
	loading:require( 'common/images/default.png' )
} )
fastclick.attach( document.body )
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
