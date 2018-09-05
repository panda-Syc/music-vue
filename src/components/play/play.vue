<template>

	<div class="player" v-show="playlist.length>0">

		<transition name="normal">
			<div class="normal-player" v-show="fullScreen">
				<div class="background">
          			<img width="100%" height="100%" :src="cuttentSong.image">
       			</div>
				<div class="top">
					<div class="back" @click="back">
						<i class="icon-back"></i>
					</div>
					<h1 class="title" v-html="cuttentSong.name"></h1>
					<h2 class="subtitle" v-html="cuttentSong.singer"></h2>
				</div>
				<div class="middle">
					<div class="middle-l">
						<div class="cd-wrapper">
							<div class="cd">
								<img :src="cuttentSong.image" alt="" class="image" :class="rotate">
							</div>
						</div>
						<div class="playing-lyric-wrapper">
							<div class="playing-lyric"></div>
						</div>
					</div>
				</div>
				<div class="bottom">
					<div class="progress-wrapper">
						<span class="time time-l">{{format(currentTime)}}</span>
						<div class="progress-bar-wrapper">
							<progerss :duration="duration"></progerss>
						</div>
						<span class="time time-r">{{format(cuttentSong.duration)}}</span>
					</div>
					<div class="operators">
		            	<div class="icon i-left">
		              		<i class="icon-sequence"></i>
		            	</div>
			            <div class="icon i-left" @click="prev">
			              <i class="icon-prev"></i>
			            </div>
			            <div class="icon i-center">
			              <i :class="playState" @click="togglePlay"></i>
			            </div>
			            <div class="icon i-right" @click="next">
			              <i class="icon-next"></i>
			            </div>
			            <div class="icon i-right">
			              <i class="icon icon-not-favorite"></i>
			            </div>
	          		</div>
				</div>
			</div>
		</transition>
		<transition name="mini">
			<div class="mini-player" v-show="!fullScreen" @click="open">
				<div class="icon">
					<div class="imgWrapper" :class="rotate">
						<img :src="cuttentSong.image" alt="" width="40" height="40" :class="rotate">
					</div>
				</div>
				<div class="text">
					<h2 class="name" v-html="cuttentSong.name"></h2>
          			<p class="desc" v-html="cuttentSong.singer"></p>
				</div>
				<div class="control">
					<i :class="playMiniState" @click.stop="toggleMiniPlay"></i>
				</div>
				<div class="control">
					<i class="icon-playlist"></i>
        		</div>
			</div>
		</transition>
		<audio :src="cuttentSong.url" ref="audio" @canplay="randy" @error="error" @timeupdate="update"></audio>
	</div>

</template>
<script>
	import { mapGetters,mapMutations } from "vuex"
	import Progerss from "components/progress/progress-bar"
	export default{
		components:{
			Progerss,
		},
		data(){
			return{
				flag:false,
				currentTime:0
			}
		},
		computed:{
			...mapGetters([
				'playlist',
				'fullScreen',
				'cuttentSong',
				'playing',
				'currentIndex',
			]),
			playState(){
				return this.playing?'icon-pause':'icon-play'
			},
			playMiniState(){
				return this.playing?'icon-pause-mini':'icon-play-mini'
			},
			rotate(){
				return this.playing?'play':'pause'
			},
			duration(){
				return this.currentTime/this.cuttentSong.duration;
			}


		},
		methods:{
			back(){
				this.setFullScreen( false )
			},
			...mapMutations({
				setFullScreen:"SET_FULL_SCREEN",
				setPlayingState:"SET_PLAYING_STATE",
				setCurrentIndex:"SET_CURRENT_INDEX",
			}),
			open(){
				this.setFullScreen( true )
			},
			togglePlay(){
				if( !this.flag ){
					return
				}
				this.setPlayingState( !this.playing );
			},
			toggleMiniPlay(){
				if( !this.flag ){
					return
				}
				this.setPlayingState( !this.playing );
			},
			next(){
				if( !this.flag ){
					return
				}
				let index=this.currentIndex+1;
				if( index===this.playlist.length ){
					index=0;
				}
				this.setCurrentIndex( index );
				if( !this.playing ){
					this.setPlayingState( !this.playing );
				}
				this.flag=false
			},
			prev(){
				if( !this.flag ){
					return
				}
				let index=this.currentIndex-1;
				if( index<0 ){
					index=this.playlist.length-1;
				}
				this.setCurrentIndex( index );
				if( !this.playing ){
					this.setPlayingState( !this.playing );
				}
				this.flag=false
			},
			randy(){
				this.flag=true;
			},
			error(){
				this.flag=true;
			},
			update(e){
				this.currentTime = e.target.currentTime
			},
			format(interval) {
		        interval = interval | 0
		        const minute = interval / 60 | 0
		        const second = this._zero(interval % 60)
		        return `${minute}:${second}`
     		},
     		_zero( zero ){
     			let len=zero.toString().length;
     			if( len<2 ){
     				return "0"+zero
     			}else{
     				return zero
     			}
     		}
		},
		watch:{
			cuttentSong(){
				this.$nextTick(()=>{
					this.$refs.audio.play()
				})
			},
			playing(newTF){
				const audio=this.$refs.audio;
				this.$nextTick(()=>{
					newTF?audio.play():audio.pause();
				})
			}
		}
	}
</script>
<style lang="stylus" rel="" scoped>
  @import "~common/stylus/veriable"
  @import "~common/stylus/mixin"
	.player
		.normal-player
			position:fixed
			left:0
			top:0
			bottom:0
			right:0
			z-index:150
			background:$color-background
			.background
				position: absolute
				left: 0
				top: 0
				width: 100%
				height: 100%
				z-index: -1
				opacity: 0.6
				filter: blur(20px)
			.top
				position:relative
				margin-bottom:25px
				.back
					position:absolute
					top:0
					left:6px
					z-index:50
					.icon-back
						display:block
						padding:9px
						font-size:$font-size-large-x
						color:$color-theme
						transform:rotate( -90deg )	
				.title
					width:70%
					margin:0 auto
					line-height:40px
					text-align:center
					no-wrap()
					font-size:$font-size-large
					color:$color-text
				.subtitle
					line-height:20px
					text-align:center
					font-size:$font-size-medium
					color:$color-text
			.middle
				position:fixed
				width:100%
				top:80px
				bottom:170px
				white-space:nowrap
				font-size:0
				.middle-l
					dispaly:inline-block
					vertical-align:top
					position:relative
					width:100%
					height:0
					padding-top:80%
					.cd-wrapper
						position:absolute
						top:0
						left:10%
						width:80%
						height:100%
						.cd
							width:100%
							height:100%
							border-radius:50%
							.image
								position:absolute
								left:0
								top:0
								width:100%
								height:100%
								box-sizing:border-box
								border-radius:50%
								border:10px solid rgba( 255,255,255,0.1 )
								&.play
									animation: move 20s infinite linear
								&.psuse
									animation-play-state:pause
			.bottom
				position:absolute
				bottom:50px
				width:100%
				.operators
					display:flex
					align-items:center
					.icon
						flex:1
						color:$color-theme
						i
							font-size:30px
					.i-left
							text-align:right
					.i-right
							text-align:left
					.i-center
						padding:0 20px
						text-align:center
						i
							font-size:40px
				.progress-wrapper
					display: flex
					width:80%
					margin:0 auto
					.time
						flex:0 0 30px
						width:30px
						height:30px
						line-height:30px
						color: $color-text
						font-size: $font-size-small
						&.time-l
							text-align:left
						&.time-r
							text-align:right
					.progress-bar-wrapper
						flex:1
			&.normal-enter-active,&.normal-leave-active
				transition:all 0.4s
				.top,.bottom
					transition:all 0.4s
			&.normal-enter,&.normal-leave-to
				opacity:0
				.top
					transform:translate3d( 0,-100px,0 )
				.bottom
					transform:translate3d( 0,100px,0 )
		.mini-player
			display:flex
			position:fixed

			left:0
			bottom:0
			width:100%
			height:60px
			background:$color-highlight-background
			.icon
				flex:0 0 40px
				width:40px
				height:40px
				padding: 10px 10px 0 20px
				.imgWrapper
					height:100%
					width:100%
					img
						border-radius:50%
						&.play
							animation: move 20s linear infinite
						&.psuse
							animation-play-state: pause
			.text
				display:flex
				flex:1
				flex-direction: column
				justify-content: center
				line-height:20px
				overflow:hideen
				.name
					margin-bottom:2px
					no-wrap()
					font-size:$font-size-medium
					color:$color-text
				.desc
					no-wrap()
					font-size:$font-size-medium
					color:$color-text
			.control
				display: flex
				align-items:center
				flex:0 0 30px
				width:30px
				padding: 0 10px	
				.icon-play-mini, .icon-pause-mini, .icon-playlist
					font-size: 30px
					color:$color-theme-d
			&.mini-enter-active,&.mini-leave-enter
				transition:all 0.8s
			&.mini-enter,&.mini-leave-to
				opacity:0
@keyframes move
	0%
		transform: rotate( 0deg )
	25%
		transform: rotate( 90deg )
	50%
		transform: rotate( 180deg )
	75%
		transform: rotate( 270deg )
	100%
		transform:rotate( 360deg )
</style>