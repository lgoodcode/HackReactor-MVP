import { Router } from 'express'
import { register, login, logout, getSession } from '@/controllers/users'

const router = Router()

router.get('/session', getSession)
router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)

export default router
