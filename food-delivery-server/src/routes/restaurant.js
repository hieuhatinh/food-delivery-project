import express from 'express'
import { restaurantController } from '../controllers/index.js'
import uploadImage from '../middleware/uploadImage.js'

const restaurantRouter = express.Router()

// user
restaurantRouter.get('/get-restaurants', restaurantController.getRestaurants)
restaurantRouter.get(
    '/:idRestaurant/get-info',
    restaurantController.getInfoARestaurant,
)

// restaurant (cần check role='restaurant')
restaurantRouter.post(
    '/create',
    uploadImage.single('image_res'),
    restaurantController.createRestaurant,
)

export default restaurantRouter
