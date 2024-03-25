import express from 'express'
import { restaurantController } from '../controllers/index.js'

const restaurantRouter = express.Router()

restaurantRouter.get('/get', restaurantController.getRestaurants)

export default restaurantRouter
