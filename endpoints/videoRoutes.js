import express from 'express'
import VideoController from '../controllers/VideoController.js'

const router = express.Router()

router.get('/video', (req, res) => VideoController.get(req, res))

export default router