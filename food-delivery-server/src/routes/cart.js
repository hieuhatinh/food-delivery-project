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

// update quantity
cartRouter.patch(
    '/update-quantity/:idCart/:idMeal', 
    authenticateToken, 
    cartController.updateQuantity
)

// đếm số lượng món trong giỏ hàng
cartRouter.get(
    '/count-quantity-meals/:idCart', 
    authenticateToken, 
    cartController.countQuantityMeals
)

// xoá món ăn khỏi giỏ hàng
cartRouter.delete(
    '/delete-meal/:idCart/:idMeal',
    authenticateToken,
    cartController.removeFromCart,
)

cartRouter.delete(
    '/delete-meal-many/:idCart',
    authenticateToken,
    cartController.removeManyFromCart,
)

export default cartRouter
