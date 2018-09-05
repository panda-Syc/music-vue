<template>
	<div class="progress-bar">
		<div class="bar-inner" ref="barInner">
			<div class="progress" ref="progress" ></div>
			<div class="progress-btn-wrapper" ref="progressBtn">
				<div class="progress-btn" ></div>
			</div>
		</div>
	</div>
</template>
<script>
import { prefixStyle } from "common/js/dom.js"
let transform=prefixStyle( 'transform' );
	export default{
		props:{
			duration:Number,
			default:0
		},
		watch:{
			duration(newX){
				if( newX>=0 ){
					let barInner=this.$refs.barInner.clientWidth-this.$refs.progressBtn.clientWidth;
					let widthL=barInner*newX;
					this.$refs.progress.style.width=`${ widthL }px`;
					this.$refs.progressBtn.style[transform]=`translate3d( ${ widthL }px,0,0 )`;
				}
			}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/veriable"
	.progress-bar
		height:30px
		.bar-inner
			position:relative
			top:13px
			height:4px
			background:rgba( 0,0,0,0.3 )
			width:100%
			.progress
				position:absolute
				height:100%
				background:$color-theme
			.progress-btn-wrapper
				position:absolute
				left:-8px
				top:-13px
				width:30px
				height:30px
				.progress-btn
					position:relative
					top:7px
					left:7px
					box-sizing:border-box
					width:16px
					height:16px
					border:3px solid $color-text
					border-radius: 50%
					background:$color-theme
					
					
</style>