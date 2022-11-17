import { Router } from 'express'
import { register, login, getSession } from '@/controllers/users'

const router = Router()

router.get('/session', getSession)
router.post('/register', register)
router.post('/login', login)

export default router
