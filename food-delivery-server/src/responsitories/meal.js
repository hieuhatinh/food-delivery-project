import { Types } from 'mongoose'
import ErrorHandler from '../Exception/ErrorHandler.js'
import { CategoryModel, MealModel, RestautantModel } from '../models/index.js'
import { createImage } from './image.js'

// user
const searchMeal = async ({ limit, searchValue }) => {
    const meals = await MealModel.find({
        foodName: { $regex: searchValue, $options: 'i' },
    })
        .populate('restaurant')
        .populate('category')
        .populate('artwork')
        .limit(limit)
        .exec()

    return { meals: { ...meals } }
}

const getDetailMeal = async ({ idMeal }) => {
    const mealInfo = await MealModel.findById(idMeal)
        .populate('restaurant', '_id restaurantName address state')
        .populate('category', '_id categoryName')
        .populate('artwork')

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
    priceAndSize,
    artwork,
    describe,
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

    // Tạo liên kết giữa Category và Restaurant
    await CategoryModel.findOneAndUpdate(
        { _id: idCategory },
        { $addToSet: { restaurants: idRestaurant } }, // Sử dụng $addToSet để đảm bảo không có phần tử trùng lặp
        { new: true, upsert: true }, // upsert: true sẽ tạo mới tài liệu nếu không tìm thấy
    )

    await RestautantModel.findOneAndUpdate(
        { _id: idRestaurant },
        { $addToSet: { categories: idCategory } }, // Sử dụng $addToSet để đảm bảo không có phần tử trùng lặp
        { new: true, upsert: true }, // upsert: true sẽ tạo mới tài liệu nếu không tìm thấy
    )

    if (existMeal) {
        throw new ErrorHandler('Món ăn đã tồn tại trong quán', 409)
    }

    const newImage = await createImage(artwork, foodName + idRestaurant)

    // tạo món ăn mới
    const newMeal = await MealModel.create({
        restaurant: idRestaurant,
        category: idCategory,
        foodName,
        priceAndSize,
        artwork: new Types.ObjectId(newImage._id),
        describe,
    })

    return { mealInfo: { ...newMeal._doc } }
}

export default { searchMeal, getDetailMeal, createMeal }
