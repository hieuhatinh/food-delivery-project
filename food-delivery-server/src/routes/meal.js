import express from 'express'
import { mealController } from '../controllers/index.js'
import uploadImage from '../middleware/uploadImage.js'

const mealRouter = express.Router()

// user
mealRouter.get('/:idMeal/detail', mealController.getDetailMeal)

// restaurant (cần check role)
mealRouter.post(
    '/create/:idRestaurant/:idCategory',
    uploadImage.single('artwork'),
    mealController.createMeal,
)

export default mealRouter
