<template>
	<div class="song-list">
		<ul>
			<li class="item" v-for="(item,index) in songList" @click="selectItem( item,index )">
				<div class="content">
					<h2 class="name">{{ item.name }}</h2>
					<p class="desc">演唱者:{{ item.singer }}/专辑:{{ item.album }}</p>
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
	import { Indicator } from 'mint-ui';
	export default{
		props:{
			songList:{
			type:Array,
			default:[],
			}
		},
		created(){
			if( this.songList=="" ){
				Indicator.open('Loading...');
			}
	
		},
		methods:{
			selectItem( item,index ){
				this.$emit( 'select',item,index )
			}
		},
		watch:{
			songList(des){
				if( des!="" )	{
					Indicator.close();
				}
			}
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/veriable"
  @import "~common/stylus/mixin"

.song-list
    .item
      display: flex
      align-items: center
      box-sizing: border-box
      height: 64px
      font-size: $font-size-medium
      .rank
        flex: 0 0 25px
        width: 25px
        margin-right: 30px
        text-align: center
      .content
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          no-wrap()
          color: $color-text
        .desc
          no-wrap()
          margin-top: 4px
          color: $color-text-d	
</style>