import express from 'express'
import { userController } from '../controllers/index.js'
import { checkDateOfBirth, checkPhoneNumber } from '../middleware/index.js'

const userRouter = express.Router()

userRouter.post('/login', userController.login)

userRouter.post('/register', userController.register)

userRouter.patch(
    '/:id/update-information',
    // checkDateOfBirth,
    // checkPhoneNumber,
    userController.updateInfo,
)
userRouter.get('/:id/get-information', userController.getUserInfo)

export default userRouter
