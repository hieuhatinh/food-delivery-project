import { CategoryModel, MealModel } from '../models/index.js'

const getCategory = async ({ limit }) => {
    const categories = await CategoryModel.find().limit(limit)

    return { categories: { ...categories } }
}

const searchByCategory = async ({ limit, idCategory }) => {
    const meals = await MealModel.find({
        category: idCategory,
    })
        .populate('category')
        .populate('restaurant')
        .limit(limit)

    return { meals: { ...meals } }
}

export default { getCategory, searchByCategory }
