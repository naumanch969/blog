import express from 'express'
import { getAllCategories, createCategory } from '../controllers/category.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

router.get('/all', getAllCategories)
router.post('/create', verifyToken, createCategory)

export default router;