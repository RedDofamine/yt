import youtube from "../service/youtube.js"

import downloadPage from '../public/pages/download.js'
import homePage from '../public/pages/home.js'

export async function get(req, res) {
	const { url } = req.query
	console.log(req.body)
	console.log(url)
	try {
		if (!url) return res.send(homePage())
		const data = await youtube.get(url)
		// res.send(downloadPage(data, url))
		res.status(200).json(data)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}
export default {
	get
}