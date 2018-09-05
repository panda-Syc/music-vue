import json from "common/js/jsonp.js"
import { commonParam,options } from "./config.js"

export function getSinger(){
	const url="https://c.y.qq.com/v8/fcg-bin/v8.fcg";
	const data=Object.assign( {},commonParam,{
		channel: 'singer',
	    page: 'list',
	    key: 'all_all_all',
	    pagesize: 100,
	    pagenum: 1,
	    hostUin: 0,
	    needNewCode: 0,
	    platform: 'yqq'
	} )
	return json( url,data,options );
}

export function getDetall(singerId){
	const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg';
	const data=Object.assign( {},commonParam,{
		hostUin: 0,
		needNewCode: 0,
		platform: 'yqq',
		order: 'listen',
		begin: 0,
		num: 80,
		songstatus: 1,
		singermid: singerId
	} )
	return json( url,data,options )
}

export function getSongVkey (songmid) { // 获取歌曲的vkey
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
  const data = Object.assign({}, {
    callback: 'musicJsonCallback',
    loginUin: 3051522991,
    format: 'jsonp',
    platform: 'yqq',
    needNewCode: 0,
    cid: 205361747,
    uin: 3051522991,
    guid: 5931742855,
    songmid: songmid,
    filename: `C400${songmid}.m4a`
  })

  return json(url, data)
}


