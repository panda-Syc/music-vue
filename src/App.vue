<template>
  <div id="app">
    <mheader></mheader>
    <tab></tab>
      <transition :name="transitionName">
        <keep-alive>
          <router-view class='router'></router-view>
        </keep-alive>
      </transition>
    <play></play>  

  </div>
</template>

<script>
import mheader from "components/music-header/MHeader.vue"
import Tab from "components/tab/tab.vue"
import play from "components/play/play.vue"
export default {
  name: 'App',
  components:{
    mheader,
    Tab,
    play
  },
  data(){
    return{
      transitionName:'slide-right'
    }
  },
  watch:{
    "$route"(to,from){
        console.log(from.path);
        if( to.path=="/recommend" ){
          this.transitionName='slide-right';
        }else if( from.path==="/recommend" ){
          this.transitionName='slide-left';
        }else if( to.path=="/singer" ){
          this.transitionName='slide-right';
        }else if( from.path==="/singer" ){
          this.transitionName='slide-left';
        }else if( to.path=="/rank" ){
          this.transitionName='slide-right';
        }else if( from.path==="/rank" ){
          this.transitionName='slide-left';
        }else if( to.path=="/search" ){
          this.transitionName='slide-right';
        }else if( from.path==="/search" ){
          this.transitionName='slide-left';
        }
    }
  }
}
</script>

<style lang="stylus" rel="sheetstyle/stylus">
.router
  transition: all .5s ease; 
.slide-left-enter, .slide-right-leave-active
    opacity: 0;  
    transform: translate(100%, 0);    
.slide-left-leave-active,.slide-right-enter
    opacity: 0
    transform: translate(-100% 0) 

</style>
