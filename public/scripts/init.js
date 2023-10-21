// import { infoUI } from '../scripts/infoUI.js'


const block = {
	find: document.querySelector('.content--find'),
	info: document.querySelector('.content--info'),
	download: document.querySelector('.content--download'),
	modal: document.querySelector('.content--modal')
}

// const findBlock = document.querySelector('.content--find')
// const infoBlock = document.querySelector('.content--info')
// const downloadBLock = document.querySelector('.content--download')
// const modalBlock = document.querySelector('.content--modal')

async function fetchData(url, body) {
	const options = {}
	if (body) {
		options.method = 'POST'
		options.body = body
	} else {
		options.method = 'GET'
	}
	options.headers = {
		"Content-Type": "application/json"
	}
	try {
		const responce = await fetch(url, options)
		if (responce.ok) {
			const data = await responce.json()
			// console.log(data)
			// const generatedHTML = infoUI(data)
			block.info.innerHTML = infoUI(data)
			// infoBlock.insertAdjacentHTML('beforeend', generatedHTML)
			block.modal.classList.add('content--disabled')
			block.info.classList.remove('content--disabled')
		} else {
			console.error('Помилка запиту:', responce.status)
		}
	} catch (err) {
		console.error('Помилка:', err)
	}
}
// !-----
async function fetchLink(url, body) {
	const options = {}
	if (body) {
		options.method = 'POST'
		options.body = body
	} else {
		options.method = 'GET'
	}
	options.headers = {
		"Content-Type": "application/json"
	}
	try {
		const responce = await fetch(url, options)
		if (responce.ok) {
			const link = await responce.json()
			block.download.innerHTML = downloadUI(link)
			block.modal.classList.add('content--disabled')
			block.download.classList.remove('content--disabled')
			// console.log(data)
			// const generatedHTML = infoUI(data)
			// block.info.innerHTML = infoUI(data)
			// infoBlock.insertAdjacentHTML('beforeend', generatedHTML)
			// block.modal.classList.add('content--disabled')
			// block.info.classList.remove('content--disabled')
		} else {
			console.error('Помилка запиту:', responce.status)
		}
	} catch (err) {
		console.error('Помилка:', err)
	}
}

// ! --------
function sendUrl() {
	const urlForm = document.getElementById('url')
	event.preventDefault()

	const urlFormData = new FormData(urlForm)

	const data = {}
	urlFormData.forEach((value, key) => {
		data[key] = value
	})
	if (!data.url) {
		console.log('it\'s empty')
	} else {
		block.find.classList.add('content--disabled')
		block.modal.classList.remove('content--disabled')
		fetchData('?url=' + data.url)
	}
}

function loadForm(id) {
	const formOptions = document.querySelectorAll('input[form="options"]')
	const formElements = document.querySelectorAll(`input[form="${id}"]`)
	const formData = {}
	const filter = {}

	for (let i = 0; i < formElements.length; i++) {
		filter[formElements[i].name] = formElements[i].value
	}
	for (let i = 0; i < formOptions.length; i++) {
		formData[formOptions[i].name] = formOptions[i].value
	}
	formData.filter = filter

	block.info.classList.add('content--disabled')
	block.modal.classList.remove('content--disabled')
	fetchLink('/load', JSON.stringify(formData))


	// block.download.classList.remove('content--disabled')
	// console.log(formData)
}

function back(backToBlock, currentBlock) {
	console.log('click')
	block[currentBlock].classList.add('content--disabled')
	block[backToBlock].classList.remove('content--disabled')
}