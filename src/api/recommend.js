import json from "common/js/jsonp.js"
import { commonParam,options } from "./config.js"
import axios from "axios"

export function getRecommend(){
	const url="https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg";
	const data=Object.assign( {},commonParam,{
		platform: 'h5',
	    uin: 0,
	    needNewCode: 1
	} );
	return json( url,data,options );
}

export function getDiscList(){
	const url="/api/getDiscList";
	const data=Object.assign( {},commonParam,{
		hostUin: 0,
		platform: "yqq",
		needNewCode: 0,
		categoryId: 10000000,
		sortId: 5,
		sin: 0,
		ein: 29,
		rnd:Math.random(),
		format: 'json'
	} )
	return axios.get( url,{
		params:data
	} ).then( ( res )=>{
		return Promise.resolve( res.data )
	} ).catch( (e)=>{
		console.log( "失败" )
	} )
}
