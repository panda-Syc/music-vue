export default class Song{
	constructor({id, mid, singer, name, album, duration, image, url}){
		this.id = id
	    this.mid = mid
	    this.singer = singer
	    this.name = name
	    this.album = album
	    this.duration = duration
	    this.image = image
	    this.url = url
	}
}

export function Created( musicDate,vkey ){
		return new Song({
			id:musicDate.songid,
			mid:musicDate.singmid,
			singer:filterSinger( musicDate.singer ),
			name:musicDate.songname,
			album:musicDate.albumname,
			duration:musicDate.interval,
			image:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicDate.albummid}.jpg?max_age=2592000`,
			url: `http://dl.stream.qqmusic.qq.com/C400${musicDate.songmid}.m4a?fromtag=38&guid=5931742855&vkey=${vkey}`
		})
}

export function filterSinger(list){
		let res=[];
		list.forEach( (rep)=>{
			res.push( rep.name );
		} )
		return res.join( "/" );
}