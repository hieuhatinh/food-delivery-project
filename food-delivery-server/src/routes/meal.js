import express from 'express'
import { mealController } from '../controllers/index.js'

const mealRouter = express.Router()

mealRouter.post('/search', mealController.searchMeal)

export default mealRouter
