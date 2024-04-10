import express from 'express'
import { searchController } from '../controllers/index.js'

const searchRouter = express.Router()

searchRouter.get('/category/:idCategory', searchController.searchByCategory)
searchRouter.get('/meal', searchController.searchMeal)

export default searchRouter
