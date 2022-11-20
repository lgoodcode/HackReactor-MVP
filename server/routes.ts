import { Router } from 'express'
import { register, login, logout, getSession } from '@/controllers/users'
import { addToLibrary } from '@/controllers/library'

const router = Router()

router.get('/session', getSession)
router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)

router.post('/library/:id', addToLibrary)

export default router
