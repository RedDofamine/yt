import ytdl from "ytdl-core"
import fs from 'fs'
import path from 'path'
// import download from "../utils/download"
function mediaFilter(format, filterData) {
	const keys = Object.keys(filterData);
	let isEqual = 0;
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		if (format[key] === filterData[key]) {
			isEqual++;
		}
	}
	if (isEqual === keys.length - 1) {
		return true;
	}
	return false;
}

function getResource(url, filterData, filePath) {
	const stream = ytdl(url, { filter: format => mediaFilter(format, filterData) })
	return stream
	// stream.pipe(fs.createWriteStream(filePath));
	// stream.on('finish', () => {
	// 	return true
	// 	console.log('Відео завантажено успішно!');
	// });

	// stream.on('error', (err) => {
	// 	return false
	// 	console.error('Помилка завантаження відео:', err);
	// });
}
async function getInfo(url) {
	return await ytdl.getInfo(url)
}

function getName(videoDetails) {
	return `${videoDetails.title} - ${videoDetails.author.name}`
}
function getImage(images, filter = { resolutionHeight: 360 }) {
	const { ext, resolutionHeight } = filter

	const [imageWithRes] = images.filter(el => el.height >= resolutionHeight)
	const extOfImage = imageWithRes.url.match(/\.([a-z0-9]+)(?:[\?#]|$)/i)[1]
	if (ext && ext == extOfImage) {
		return { ext: ext, url: imageWithRes.url }
	} else {
		return { ext: extOfImage, url: imageWithRes.url }
	}
	return {}
	// images.forEach(element => {
	// 	if (element.height >= resolutionHeight &&) {
	// 		image.url = element.url
	// 		image.ext = element.url.match(/\.([a-z0-9]+)(?:[\?#]|$)/i)[1]
	// 	}
	// });
}
function listsOfItems(formats) {
	const videoList = []
	const audioList = []
	formats.forEach(format => {
		if (format.hasAudio) {
			audioList.push({
				container: format.container,
				audioSampleRate: format.audioSampleRate,
				audioBitrate: format.audioBitrate,
				// hasAudio: true,
				// hasVideo: false
			})
		}
		if (format.hasVideo) {
			videoList.push({
				container: format.container,
				qualityLabel: format.qualityLabel,
				// hasAudio: false,
				// hasVideo: true
			})
		}
	});
	return { videoList, audioList }
}

async function start(url) {
	const rawInfo = await getInfo(link)
	const name = getName(rawInfo.videoDetails)
	const image = getImage(rawInfo.videoDetails.thumbnails)
	const { videoList, audioList } = listsOfItems(rawInfo.formats)
	console.log(videoList[12])
	console.log(audioList[0])
	const fileName = `${name}.${audioList[0].container}`
	await getResource(link, audioList[0], fileName)
	// console.log(name)
	// console.log(image)
	// console.log(rawInfo.videoDetails.thumbnails)
}

async function get(url) {
	const rawInfo = await getInfo(url)
	const name = getName(rawInfo.videoDetails)
	const image = getImage(rawInfo.videoDetails.thumbnails)
	const { videoList, audioList } = listsOfItems(rawInfo.formats)
	return {
		name,
		image,
		videoList,
		audioList
	}
}
async function download(url, filter, name) {
	const fileName = `${name}.${filter.container}`
	const dir = path.join(process.cwd(), '/public/files/')
	// const filePath = dir + name
	const filePath = dir + fileName
	console.log(url, filter, name, filePath)
	if (getResource(url, filter, filePath)) {
		return fileName
	}
}
// encodeURIComponent
// async function download(url, item) {
// 	const getResource(url, item, )
// }
// const link = 'https://www.youtube.com/watch?v=HwPBEgY79Xw'
// // const link = 'https://youtu.be/pprfav6Y_M4?si=WHXOtivXDzJu-s8U'
// start(link)
export default {
	get,
	download,
	getResource,
}