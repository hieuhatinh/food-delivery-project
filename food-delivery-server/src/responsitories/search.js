import ErrorHandler from '../Exception/ErrorHandler.js'
import { CategoryModel, MealModel } from '../models/index.js'

const searchByCategory = async ({ limit, idCategory }) => {
    const existCategory = await CategoryModel.findOne({ _id: idCategory })

    if (!existCategory) {
        throw new ErrorHandler(
            'Không tồn tại loại món ăn này trong hệ thống',
            404,
        )
    }

    const meals = await MealModel.find({
        category: idCategory,
    })
        .populate('category')
        .populate('restaurant')
        .limit(limit)

    return meals
}

const searchMeal = async ({ limit, searchValue }) => {
    const meals = await MealModel.find({
        foodName: { $regex: searchValue, $options: 'i' },
    })
        .populate('restaurant')
        .populate('category')
        .limit(limit)
        .exec()

    return meals
}

export default { searchByCategory, searchMeal }
