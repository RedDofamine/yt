import youtube from "../service/youtube.js"
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from "url"
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
// import homePage from '../public/pages/homePage.js'

export async function get(req, res) {
	const { url } = req.query
	console.log(url)
	try {
		// console.log(__dirname, 'he')
		// console.log(path.join(__dirname, '/public/pages/index.html'))
		if (!url) {
			// return res.status(200).json({ message: 'ok' })
			return res.sendFile(path.join(__dirname, '../public/pages/index.html'))

		}
		const data = await youtube.get(url)
		if (!data) {
			return res.status(200).json({ message: 'data not found' })
		}
		data.url = url
		res.status(200).json(data)

	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

export async function load(req, res) {
	const { url, filter, name } = req.body
	console.log(req.body)

	try {
		if (filter.container == 'mp4') filter.container == 'mp3'
		const fileName = `${name}.${filter.container}`
		const dir = `${process.cwd()}\\public\\files\\`
		// const filePath = dir + name
		const filePath = dir + fileName
		const fileStream = youtube.getResource(url, filter)
		fileStream.pipe(fs.createWriteStream(filePath))
		fileStream.on('finish', () => {
			console.log('file loaded')
			res.status(200).json(fileName)
		})
		fileStream.on('error', (err) => {
			res.status(500).json({ error: err.message })
		})
		// const fileName = await youtube.download(url, filter, name)
		// console.log(fileName)
		// res.status(200).json(fileName)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}
export async function download(req, res) {
	const { link } = req.params
	try {
		const filePath = path.join(__dirname, `../public/files/${link}`)
		res.download(filePath, (err) => {
			if (err) {
				console.error(err)
				res.status(500).json({ error: err.message })
			}
			fs.unlink(filePath, (err) => {
				if (err) {
					console.error(err)
					res.status(500).json({ error: err.message })
				}
			})
		})
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

export default {
	get,
	download,
	load,
}