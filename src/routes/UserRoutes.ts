import express, { Router } from 'express'
import multer from 'multer' 
import { createUser, deleteUser, getUserById, getUsers, updateUser, loginUser } from '../controllers/UserController'
import { verifyToken } from '../auth/auth'

const router: Router = express.Router()

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })

router.use(verifyToken)

router.get('/users', getUsers)
router.get('/users/:id', getUserById)
router.post('/user', createUser)
router.put('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)
router.post('/login', loginUser)
// router.put('/userPicture/:id', upload.single('picture'), updateUserPicture)

export default router