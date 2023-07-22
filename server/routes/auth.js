import express from 'express'
import { auth } from '../middleware/auth.js'
import { register } from '../controllers/auth.js'

const router = express.Router()

router.get('/register', register)

export default router