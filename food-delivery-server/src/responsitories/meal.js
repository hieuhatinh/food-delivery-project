import ErrorHandler from '../Exception/ErrorHandler.js'
import { CategoryModel, MealModel, RestautantModel } from '../models/index.js'

// user

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
    const exitRes = await RestautantModel.findOne({ _id: idRestaurant })
    const exitCategory = await CategoryModel.findOne({ _id: idCategory })

    if (!exitRes) {
        throw new ErrorHandler('Nhà hàng không tồn tại', 404)
    }

    if (!exitCategory) {
        throw new ErrorHandler('Loại món ăn không tồn tại', 404)
    }

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

    // tạo món ăn mới
    const newMeal = await MealModel.create({
        restaurant: idRestaurant,
        category: idCategory,
        foodName,
        priceAndSize,
        artwork: {
            fileName: artwork.originalname,
            path: artwork.path,
            mimetype: artwork.mimetype,
        },
        describe,
    })

    return { mealInfo: { ...newMeal._doc } }
}

export default { getDetailMeal, createMeal }
