import { MealModel } from '../models/index.js'

const searchMeal = async ({ limit, searchValue }) => {
    const meals = await MealModel.find({
        foodName: { $regex: searchValue, $options: 'i' },
    })
        .populate('restaurant')
        .populate('category')
        .limit(limit)
        .exec()

    return { meals: { ...meals } }
}

export default { searchMeal }
