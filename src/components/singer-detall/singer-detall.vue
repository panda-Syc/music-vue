<template>
		<transition name="live">
			<music :songs="song" :bg-image="this.add().image" :title="this.add().name"></music>
		</transition>
</template>
<script>
	import Music from "components/musicList/music-list.vue"
	import { mapGetters } from 'vuex'
	import { getDetall,getSongVkey } from "api/singer.js"
	import { ERR_OK } from "api/config.js"
	import { Created } from "common/js/song.js"
	export default{
		data(){
			return{
				song:[]
			}
		},

		components:{
			Music,
		},

		methods:{
			...mapGetters({
				add:"singer"
			}),
			_getDetall(){
				if( !this.add().id ){
					this.$router.push( { path:"/singer" } )
					return;
				}
				getDetall(this.add().id).then( (res)=>{
					if( res.code===ERR_OK ){
						this.song=this.createdSong(res.data.list);
					}
					console.log( this.song );
					
				} )
			},
			createdSong(list){
			let reg=[];
				list.forEach( (rep)=>{
					let { musicData }=rep;

					    getSongVkey(musicData.songmid).then((res) => {
				      // console.log('这首歌的vkey获取到了')
				      	const vkey = res.data.items[0].vkey;
				        if(musicData.songid && musicData.albummid){
				        	reg.push(Created(musicData,vkey));
      				  	}
    			})
  			})
			return reg;
				
			}
		},
		created(){
			this._getDetall();
		}
	}
</script>
<style scoped lang="stylus" rel="sheetstylus">
@import "~common/stylus/veriable.styl"
	.live-enter-active,.live-leave-active
		transition:all 0.3s
	.live-enter-active
		transform: translate3d( 0,0,0 );
	.live-leave-active
		transform: translate3d( 100%,0,0 );
	.live-enter
		transform: translate3d( 100%,0,0 );
		
	
</style>