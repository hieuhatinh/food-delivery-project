import express from 'express'
import { userController } from '../controllers/index.js'

const userRouter = express.Router()

userRouter.post('/login', userController.login)

userRouter.post('/register', userController.register)

userRouter.patch('/:id/update-information', userController.updateInfo)

export default userRouter
