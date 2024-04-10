import express from 'express'

import { cartController } from '../controllers/index.js'
import authenticateToken from '../middleware/authenticateToken.js'

const cartRouter = express.Router()

cartRouter.get(
    '/get-all-meal/:idCart',
    authenticateToken,
    cartController.getAllMealInCart,
)

// thêm món ăn vào giỏ hàng
cartRouter.patch(
    '/add/:idCart/:idMeal',
    authenticateToken,
    cartController.addToCart,
)

// xoá món ăn khỏi giỏ hàng
cartRouter.delete(
    '/delete-meal/:idCart/:idMeal',
    authenticateToken,
    cartController.removeFromCart,
)

export default cartRouter
