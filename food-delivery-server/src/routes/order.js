import express from 'express'

import { orderController } from '../controllers/index.js'
import authenticateToken from '../middleware/authenticateToken.js'

const orderRouter = express.Router()

orderRouter.post('/create', authenticateToken, orderController.createNewOrder)

orderRouter.get('/get-all', authenticateToken, orderController.getAllOrder)

export default orderRouter
