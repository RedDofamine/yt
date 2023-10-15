import fs from 'fs'
import https from 'https'

async function download(url, outputPath) {
	return new Promise((resolve, reject) => {
		const file = fs.createWriteStream(outputPath)

		const request = https.get(url, (responce) => {
			if (responce.statusCode !== 200) {
				reject(`Failed to download file. Status code: ${responce.statusCode}`)
				return
			}

			responce.pipe(file)

			file.on('finish', () => {
				file.close()
				resolve()
			})
			file.on('error', (err) => {
				reject(err)
			})
		})

		request.on('error', (err) => {
			reject(err)
		})
	})
}

export default download