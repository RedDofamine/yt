import express from 'express'
import AudioController from '../controllers/AudioController.js'

const router = express.Router()

router.get('/audio', (req, res) => AudioController.get(req, res))

export default router