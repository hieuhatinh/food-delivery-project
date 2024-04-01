import ErrorHandler from '../Exception/ErrorHandler.js'
import { MealModel } from '../models/index.js'

// user
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

const getDetailMeal = async ({ idMeal }) => {
    const mealInfo = await MealModel.findById(idMeal)
        .populate('restaurant', '_id restaurantName address state')
        .populate('category', '_id categoryName')

    if (!mealInfo) {
        throw new Error('Không tồn tại món ăn này trong hệ thống!')
    }

    return { mealInfo: { ...mealInfo._doc } }
}

// restaurant
const createMeal = async ({
    idRestaurant,
    idCategory,
    foodName,
    price,
    artWork,
    describe,
    size,
}) => {
    const existMeal = await MealModel.findOne({
        $and: [
            {
                foodName,
            },
            {
                restaurant: idRestaurant,
            },
            {
                category: idCategory,
            },
        ],
    })

    if (existMeal) {
        throw new ErrorHandler('Món ăn đã tồn tại trong quán', 409)
    }

    // tạo món ăn mới
    const newMeal = await MealModel.create({
        restaurant: idRestaurant,
        category: idCategory,
        foodName,
        price,
        artWork,
        describe,
        size,
    })

    return { mealInfo: { ...newMeal._doc } }
}

export default { searchMeal, getDetailMeal, createMeal }
