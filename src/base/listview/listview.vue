<template>
	<scroll class="scroll" :data="data" 
						   :probe-type="probeType" 
						   :listen-scroll="listenScroll" ref="scroll" @scroll="scroll">
		<ul>
			<li v-for="group in data" class="list" ref="listsort">
				<h2 v-html="group.title" class="list-title"></h2>
				<ul>
					<li v-for="item in group.items" class="list-item" @click="pay( item )">
						<img v-lazy="item.image" alt="">
						<span v-text="item.name" class="name"></span>
					</li>
				</ul>
			</li>
		</ul>
		<div class="a-z" @touchstart.stop.prevent="onTouchStart" @touchmove.stop.prevent="onTouchMove">
			<ul>
				<li v-for="( item,index ) in sort" :data-index="index" :class="{ 'current':currentIndex===index }">{{ item }}</li>
			</ul>
		</div>
		<div class="list-app" v-show="first" ref="fixed">
			<div class="list-app-one">{{ first }}</div>
		</div>
	</scroll>

</template>
<script>
import Scroll from "base/scroll.vue"
import { getDate } from "common/js/dom.js"
const TITLE_HEIGHT=30;
	export default{
		components:{
			Scroll,
		},
		props:{
			data:{
				type:Array,
				default:[],
			},
			
		},
		data(){
			return{
				currentIndex:0,
				scrollY:-1,
				/*diff: -1*/

			}
		},
		created(){
			this.touch={};
			this.probeType=3;
			this.listenScroll=true;
			this.arrHeight=[];
		},
		computed:{
			sort(){
				return this.data.map( (group)=>{
					return group.title.substr( 0,1 )
				} )
			},
			first(){
				if( this.scrollY>0 ){
					return "";
				}
				return this.data[ this.currentIndex ]?this.data[ this.currentIndex ].title:"";
			}
		},
		methods:{
			onTouchStart(e){
				let sort=getDate( e.target,"index" );
				let fisttouch=e.touches[0];
				this.touch.y1=fisttouch.pageY;
				this.touch.sort=sort;
				this._scrollToElement( sort );

			},
			onTouchMove(e){
				let fisttouch=e.touches[0];
				this.touch.y2=fisttouch.pageY;
				let teachIndex=(this.touch.y2-this.touch.y1)/18 | 0
				let indexLength=teachIndex+parseInt( this.touch.sort );
				this._scrollToElement( indexLength );
			},
			scroll(pos){
				this.scrollY=pos.y;
			},
			dataChange(){
				this.arrHeight=[];
				let height=0;
				this.arrHeight.push( height );
				let arr=this.$refs.listsort;
				for( var i=0;i<arr.length;i++ ){
					height+=arr[i].clientHeight;
					this.arrHeight.push( height );
				}
			},
			pay(item){
				this.$emit( "actor",item );
			},
			_scrollToElement(index){
				if( index===null ){
					return
				};
				if( index<0 ){
					index=0
				}else if( index>this.arrHeight.length - 2 ){
					index=this.arrHeight.length - 2;
				}
				this.scrollY=-this.arrHeight[index];
				this.$refs.scroll.scrollToElement( this.$refs.listsort[ index ],0 );
			}
		},
		watch:{
			data(){
				setTimeout( ()=>{
					this.dataChange();
				},20 )
			},
			scrollY( cc ){
				if( cc>0 ){
					this.currentIndex=0;
					return;
				}
				const listHeight=this.arrHeight;
				for( var i=0;i<listHeight.length-1;i++ ){
					let height1=listHeight[i];
					let height2=listHeight[i+1];
					if(  -cc>=height1&&-cc<height2 ){
/*						this.diff = height2 + cc;*/
						this.currentIndex=i;
						return;
					}
				}
				this.currentIndex=listHeight.length-2;
			},
/*			diff(newVal) {
		        	let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
			        if (this.fixedTop === fixedTop) {
			          return
			        }
			        this.fixedTop = fixedTop
			        this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
		      	}*/
			}

	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/veriable"
.scroll
	position:relative
	width:100%
	height:100%
	overflow:hidden
	ul
		.list
			padding-bottom:30px
			.list-title
				color:$color-text-l
				font-size:$font-size-small
				padding-left:20px
				height:30px
				line-height:30px
				background-color:$color-highlight-background
			ul
				.list-item
					display: flex
					align-items:center
					padding: 20px 0 0 30px
					img
						width:50px
						height:50px
						border-radius:50%
					.name
						margin-left: 20px
						color: $color-text-l
						font-size: $font-size-medium
	.a-z
		position:absolute
		z-index:30
		right:0
		top:50%
		transform:translateY( -50% )
		width:20px
		padding:20px 0
		border-radius:10px
		text-align:center
		background-color:$color-background-d
		font-family: Helvetica
		li
			padding:3px
			line-height:1
			color:$color-text-l
			font-size:$font-size-small
			&.current
				color:$color-theme
	.list-app
		position:absolute
		top:0
		left:0
		width:100%
		.list-app-one
			height:30px
			line-height:30px
			padding-left:20px
			font-size:$font-size-small
			color:$color-text-l
			background-color:$color-highlight-background
				
				
			
			
</style>