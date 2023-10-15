import youtube from "../service/youtube.js"
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
		res.status(200).json(data)

	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

export default {
	get
}