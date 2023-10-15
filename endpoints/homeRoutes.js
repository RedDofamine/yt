import express from 'express'
import HomeController from '../controllers/HomeController.js'

const router = express.Router()

router.get('/', (req, res) => HomeController.get(req, res))

export default router