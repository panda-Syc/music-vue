<template>
	<div class="recommend">
		<scroll class="recommend-content" :data="distList" ref="scroll">
			<div>
				<div>
					<mt-swipe :auto="4000" :speed="0">
					  <mt-swipe-item v-for="item in recommend">
					  	<a :href="item.linkUrl">
					  		<img :src="item.picUrl" alt="" @load="imageLoad">
					  	</a>
					  </mt-swipe-item>
					</mt-swipe>
				</div>
				<div class="recommend-list">
					<h1 class="list-title">热门歌单推荐</h1>
					<ul>
						<li class="item" v-for="item in distList">
							<div class="icon">
								<img v-lazy="item.imgurl" alt="" width="60" height="60">
							</div>
							<div class="text">
								<h2 class="name" v-html="item.creator.name"></h2>
								<p class="desc" v-html="item.dissname"></p>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</scroll>
	</div>
</template>
<script>
	import { getRecommend,getDiscList } from "api/recommend.js"
	import { ERR_OK } from "api/config"
	import Scroll from "base/scroll.vue"
	import { Indicator } from 'mint-ui'
	export default{
		components:{
			Scroll,
		},
		data(){
			return{
				distList:[],
				recommend:[],
			}
		},
		created(){
			this._getRecommend()
			this._getDiscList()

		},
		methods:{
			_getRecommend(){
				getRecommend().then((res)=>{
					if( res.code===ERR_OK ){
						this.recommend=res.data.slider;
					}
				})
			},
			_getDiscList(){
				Indicator.open({
				  text: 'Loading...',
				  spinnerType: 'fading-circle'
				});
				getDiscList().then( (res)=>{
					if( res.code===ERR_OK ){
						this.distList=res.data.list;
						Indicator.close();
						console.log( this.distList )
					}
				} )
			},
			imageLoad(){
				if( !this.imageHeight ){
					this.$refs.scroll.refresh();
					this.imageHeight=true;
				}
				
			}
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/veriable.styl"
.recommend
	position:fixed
	width:100%
	top:88px
	bottom:0
	.recommend-content
		overflow:hidden
		height:100%
		.recommend-list
			.list-title
				height:65px
				line-height:65px
				text-align:center
				font-size:$fonot-size-medium
				color:$color-theme
			.item
				display:flex
				box-sizing:border-box
				align-itmes:center
				padding:0 20px 20px 20px
				.icon
					flex:0 0 60px
					width:60px
					padding-right:20px
				.text
					display:flex
					flex-direction:column
					justify-content:center
					flex:1
					line-height:20px
					overflow:hidden
					font-size:$font-size-medium
					.name
						margin-bottom:10px
						color:$color-text
					.desc
						color:$color-text-d
		.mint-swipe
			height:144px
			a
				display: block
				width:100%
				img
					width:100%
					display: block
</style>