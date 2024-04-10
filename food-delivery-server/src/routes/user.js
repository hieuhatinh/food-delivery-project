import express from 'express'

import { userController } from '../controllers/index.js'
import authenticateToken from '../middleware/authenticateToken.js'

const userRouter = express.Router()

userRouter.post('/login', userController.login)

userRouter.post('/register', userController.register)

userRouter.patch(
    '/update-information',
    authenticateToken,
    userController.updateInfo,
)
userRouter.get(
    '/get-information',
    authenticateToken,
    userController.getUserInfo,
)

export default userRouter
