import express from 'express'
import registerUser from '../controllers/auth/register'
import loginUser from '../controllers/auth/login'


const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)


export default router
