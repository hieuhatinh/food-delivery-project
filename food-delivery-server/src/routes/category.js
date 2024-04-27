import express from 'express'
import { categoryController } from '../controllers/index.js'
import uploadImage from '../middleware/uploadImage.js'

const categoryRouter = express.Router()

// user
categoryRouter.get('/get-categories', categoryController.getCategory)

categoryRouter.get('/get-categories-name', categoryController.getCategoriesName)

// admin (cần check role)
categoryRouter.post(
    '/create',
    uploadImage.single('category_image'),
    categoryController.createNewCategory,
)
export default categoryRouter
