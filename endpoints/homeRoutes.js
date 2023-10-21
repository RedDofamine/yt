import express from 'express'
import HomeController from '../controllers/HomeController.js'

const router = express.Router()

router.get('/', (req, res) => HomeController.get(req, res))
router.post('/load', (req, res) => HomeController.load(req, res))
router.get('/download/:link', (req, res) => HomeController.download(req, res))

export default router