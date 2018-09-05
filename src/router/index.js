import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Recommend from "components/recommend/recommend.vue"
import Rank from "components/rank/rank.vue"
import Search from "components/search/search.vue"
import Singer from "components/singer/singer.vue"
import Detall from "components/singer-detall/singer-detall.vue"
export default new Router({
  routes: [
  	{
  		path:'/',
  		redirect:'/recommend'
  	},
    {
      	path: '/recommend',
      	component:Recommend
    },
    {
    	path:"/rank",
    	component:Rank
    },
    {
    	path:"/search",
    	component:Search
    },
    {
    	path:"/singer",
    	component:Singer,
      children:[
          {
            path:":id",
            component:Detall
          }
      ]
    }
  ]
})
