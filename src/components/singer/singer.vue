<template>
	<div class="singer">
		<list-view :data="singers" @actor="jamp"></list-view>
		<router-view></router-view>
	</div>
</template>
<script>
	import { getSinger } from "api/singer.js"
	import { ERR_OK } from "api/config.js"
	import ListView from "base/listview/listview.vue"
	import { mapMutations } from 'vuex'
	const HOT_SINGER_LEN=10;
	const HOT_NAME = '热门';
	export default{
		components:{
			ListView
		},
		data(){
			return{
				singers:[],
			}
		},
		created(){
			this._getSinger();
		},
		methods:{
			jamp( res ){
				this.$router.push( {
				 	path:`/singer/${ res.id }` 
				} );
				this.add( res );
			},
			...mapMutations({
				add:"SET_SINGER"
			}),
			_getSinger(){
				getSinger().then( ( res )=>{
					if( res.code===ERR_OK ){
						this.singers=this._normalizeSinger(res.data.list);
						console.log( this.singers );
						
					}
				} )
			},
			_normalizeSinger(list){
				let map={
					hot:{
						title:HOT_NAME,
						items:[],
					}
				};
				list.forEach( ( item,index )=>{
					if( index<HOT_SINGER_LEN ){
						map.hot.items.push( {
							name:item.Fsinger_name,
							id: item.Fsinger_mid,
							image:`http://y.gtimg.cn/music/photo_new/T001R150x150M000${item.Fsinger_mid}.jpg?max_age=2592000`
						} );
					}
					const key=item.Findex;
					if( !map[key] ){
						map[key]={
							title:key,
							items:[],
						}
					}
					map[key].items.push({
							name:item.Fsinger_name,
							id: item.Fsinger_mid,
							image:`http://y.gtimg.cn/music/photo_new/T001R150x150M000${item.Fsinger_mid}.jpg?max_age=2592000`
					})

				} )
				// 为了得到有序列表，我们需要处理 map
				let ret=[];
				let hot=[];
				for( var k in map ){
					let val=map[k];
					if( val.title.match(/[a-zA-Z]/) ){
						ret.push( val )
					}else{
						hot.push( val )
					}
				}
				ret.sort((a, b) => {
          			return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        		})
        		hot.shift();
				return hot.concat(ret);
			}

		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	.singer
		position:fixed
		top:88px
		bottom:0
		width:100%
</style>