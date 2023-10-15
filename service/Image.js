// import fs from 'node:fs'
// import https from 'node:https'

// const file = fs.createWriteStream('file.webp')

// const request = https.get('https://i.ytimg.com/vi_webp/HwPBEgY79Xw/maxresdefault.webp', function (responce) {
// 	responce.pipe(file)

// 	file.on('finish', () => {
// 		file.close()
// 		console.log('download completed')
// 	})
// })