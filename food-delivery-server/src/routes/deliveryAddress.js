import express from 'express'

import { deliveryAddressController } from '../controllers/index.js'
import authenticateToken from '../middleware/authenticateToken.js'

const deliveryAddressRouter = express.Router()

deliveryAddressRouter.post(
    '/create',
    authenticateToken,
    deliveryAddressController.createNewDeliveryAddress,
)

deliveryAddressRouter.get(
    '/get-all',
    authenticateToken,
    deliveryAddressController.getAllOrder,
)

deliveryAddressRouter.get(
    '/get-default',
    authenticateToken,
    deliveryAddressController.getDefaultAddress,
)

deliveryAddressRouter.put(
    '/change/:idAddress', 
    authenticateToken, 
    deliveryAddressController.changeDeliveryAddress
)

deliveryAddressRouter.delete(
    '/delete/:idAddress', 
    authenticateToken, 
    deliveryAddressController.deleteAddress
)

export default deliveryAddressRouter
