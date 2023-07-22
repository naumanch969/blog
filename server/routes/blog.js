import express from 'express'
import { getAllBlogs, createBlog,  getBlog, updateBlog, deleteBlog } from '../controllers/blog.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

router.get('/all',  getAllBlogs)
router.get('/:id',  getBlog)

router.post('/create', verifyToken, createBlog)

router.put('/update/:id', verifyToken, updateBlog)

router.delete('/delete/:id', verifyToken, deleteBlog)

export default router;