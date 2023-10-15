'use strict';

// const staticData = [
// 	{ container: 'mp4', audioSampleRate: '44100', audioBitrate: 96, hasAudio: true, hasVideo: false },
// 	{ container: 'webm', audioSampleRate: '48000', audioBitrate: 160, hasAudio: true, hasVideo: false },
// 	{ container: 'mp4', audioSampleRate: '44100', audioBitrate: 128, hasAudio: true, hasVideo: false },
// 	{ container: 'webm', audioSampleRate: '48000', audioBitrate: 64, hasAudio: true, hasVideo: false },
// 	{ container: 'webm', audioSampleRate: '48000', audioBitrate: 48, hasAudio: true, hasVideo: false }
// ]
const staticAudioHead = [
	'container',
	'frequency',
	'bitrate'
]
const staticVideoHead = [
	'container',
	'quality'
]
const getHead = (data, title) => {
	const head = data.map(el => {
		return `<th class="table__head">${el}</th>`
	}).join('')
	return `
		<tr class="table__row">
			<th colspan="${data.length + 1}" class="table__head">${title}</th>
		</tr>
		<tr class="table__row">
			${head}
		</tr>
	`
}
const getItem = (el) => {
	let string = ''
	for (let key in el) {
		string += `<td class="table__data">${el[key] > 1000 ? el[key] / 1000 + 'kHz' : el[key]}</td><input type="hidden" name="${key}" value="${el[key]}">`
	}
	// for (let key in el) {
	// 	string += `<td class="table__data">${el[key]}<input type="hidden" name="container" value="${el[key]}"></td>`
	// }
	return string
}
const getRows = (data) => {

	const rows = data.map((el, index) => {
		const item = getItem(el)
		return `
			<tr class="table__row">
				<form class="content__form form" id="downloadForm${index}">
					${item}
					<td class="table__data">
						<button class="form__submit" type="button" onclick="downloadForm(${index})">load</button>
					</td>
				</form>
			</tr>
		`
	}).join('')
	console.log(rows)
	return rows
}

const table = (data, head, title) => {
	const headRows = getHead(head, title)
	const dataRows = getRows(data)
	return `
		<table class="table">
			${headRows}
			${dataRows}
		</table>
	`
}
// const ui = (data) => {
// 	return `
// 		<article class="content content--info content--disabled">
// 			<div class="content__img-container ${!data.image || !data.image.url ? 'content--disabled' : ''}">
// 				<img src="${data.image.url}" alt="img" class="content__img">
// 			</div>
// 				<h2 class="content__head">${data.name}</h2>
// 			<div class="content__container">
// 				${table(data.audioList, staticAudioHead, 'AUDIO')}
// 				${table(data.videoList, staticVideoHead, 'VIDEO')}
// 			</div>
// 		</article>
// 		<button class="form__submit content__back">back to find page</button>
// 	`.join('')
// }
const ui = (data) => {
	return `
		<div class="content__img-container ${!data.image || !data.image.url ? 'content--disabled' : ''}">
			<img src="${data.image.url}" alt="img" class="content__img">
		</div>
			<h2 class="content__head">${data.name}</h2>
		<div class="content__container">
			${table(data.audioList, staticAudioHead, 'AUDIO')}
			${table(data.videoList, staticVideoHead, 'VIDEO')}
		</div>
		<button class="form__submit content__back">back to find page</button>
	`
}