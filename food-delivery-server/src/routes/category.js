import express from 'express'
import { categoryController } from '../controllers/index.js'

const categoryRouter = express.Router()

categoryRouter.get('/get-categories', categoryController.getCategory)
categoryRouter.post(
    '/:idCategory/search-by-category',
    categoryController.searchByCategory,
)

export default categoryRouter
