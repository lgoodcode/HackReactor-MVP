import { Router } from 'express'
import { register, login, logout, getSession } from '@/controllers/users'
import { addToLibrary, updateInLibrary, removeFromLibrary } from '@/controllers/library'
import { addToWishlist, removeFromWishlist } from '@/controllers/wishlist'

const router = Router()

router.get('/session', getSession)
router.delete('/session', logout)
router.post('/register', register)
router.post('/login', login)

router.post('/library/:id', addToLibrary)
router.put('/library/:id', updateInLibrary)
router.delete('/library/:id', removeFromLibrary)

router.post('/wishlist/:id', addToWishlist)
router.delete('/wishlist/:id', removeFromWishlist)

export default router
