import express from 'express'
import { getAllUsers, register, login,  getUser, updateUser, deleteUser } from '../controllers/user.js'
import { verifyToken } from '../middleware/auth.js'


const router = express.Router()

router.get('/all', verifyToken, getAllUsers)
router.get('/:id', verifyToken, getUser)

router.post('/register', register)

router.put('/login', login)
router.put('/update/:id', verifyToken, updateUser)

router.delete('/delete/:id', verifyToken, deleteUser)

export default router;