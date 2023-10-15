import express from 'express'
// import videoRouter from './endpoints/videoRoutes.js'
// import audioRouter from './endpoints/audioRoutes.js'
import homeRouter from './endpoints/homeRoutes.js'
const PORT = 8080

const server = new express()
server.use(express.static('public'))
server.use(express.json())
// server.use(videoRouter)
// server.use(audioRouter)
server.use(homeRouter)

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))