import express from 'express'
import { mealController } from '../controllers/index.js'

const mealRouter = express.Router()

// user
mealRouter.post('/search', mealController.searchMeal)
mealRouter.get('/:idMeal/detail', mealController.getDetailMeal)

// restaurant (cần check role)
mealRouter.post('/create/:idRestaurant/:idCategory', mealController.createMeal)

export default mealRouter
