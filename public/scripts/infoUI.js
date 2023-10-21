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
const getItem = (el, id) => {
	let string = ''
	let disp
	for (let key in el) {
		if (el[key] > 1000) {
			disp = el[key] / 1000 + 'kHz'
		} else if (el[key] == 'mp4') {
			disp = 'mp3'
		} else {
			disp = el[key]
		}
		string += `
			<td class="table__data">${disp}</td>
			<input form="${id}" type="hidden" name="${key}" value="${el[key]}">
		`
		// string += `
		// 	<td class="table__data">${el[key] > 1000 ? el[key] / 1000 + 'kHz' : el[key]}</td>
		// 	<input form="${id}" type="hidden" name="${key}" value="${el[key]}">
		// `
	}
	// string += `
	// 	<input form="${id}" type="hidden" name="url" value="${}">
	// 	<input form="${id}" type="hidden" name="name" value="${}">
	// `
	return string
}
const getRows = (data, title) => {

	const rows = data.map((el, index) => {
		const id = `${title}LoadForm${index}`
		const item = getItem(el, id)

		return `
			<tr class="table__row">
				${item}
				<td class="table__data">
					<button form="${id}" class="form__submit" type="button" onclick="loadForm('${id}')">load</button>
				</td>
			</tr>
		`
	}).join('')

	return rows
}

const table = (data, head, title) => {
	const headRows = getHead(head, title)
	const dataRows = getRows(data, title)
	return `
		<table class="table">
			${headRows}
			${dataRows}
		</table>
	`
}
const infoUI = (data) => {
	console.log(data)
	return `
		<div class="content__img-container ${!data.image || !data.image.url ? 'content--disabled' : ''}">
			<img src="${data.image.url}" alt="img" class="content__img">
		</div>
			<h2 class="content__head">${data.name}</h2>
			<input form="options" type="hidden" name="url" value="${data.url}">
			<input form="options" type="hidden" name="name" value="${data.name}">
		<div class="content__container">
			${table(data.audioList, staticAudioHead, 'Audio')}
			<!-- ${table(data.videoList, staticVideoHead, 'Video')} -->
		</div>
		<button id="back" onclick="back('find', 'info')" class="form__submit content__back">back to find page</button>
	`
}