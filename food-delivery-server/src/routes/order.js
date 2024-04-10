import express from 'express'

import { orderController } from '../controllers/index.js'

const orderRouter = express.Router()

orderRouter.post('/create/:idUser', orderController.createNewOrder)

export default orderRouter
