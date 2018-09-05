import { playMode } from "common/js/config.js"
const state={
	singer:{},
	playing:false,//播放状态
	fullScreen:false,//是否展开
	playlist:[],//播放列表
	sequenceList:[],//播放顺序列表
	mode:playMode.sequence,
	currentIndex:-1,//当前歌曲的播放位置

}
export default state