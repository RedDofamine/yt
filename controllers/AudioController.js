import youtube from "../service/youtube.js"

export async function get(req, res) {
	const { url, name, container, audioSampleRate, audioBitrate } = req.query

	try {
		const fileName = `${name}.${container}`
		const path = await youtube.download(url, { container, audioSampleRate, audioBitrate }, fileName)
		console.log('controller', path)
		res.download(path, fileName)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

export default {
	get
}