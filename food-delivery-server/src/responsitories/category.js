import ErrorHandler from '../Exception/ErrorHandler.js'
import { CategoryModel, MealModel } from '../models/index.js'

const getCategory = async ({ limit }) => {
    const categories = await CategoryModel.find().limit(limit)

    return categories
}

const createNewCategory = async ({ categoryName }) => {
    const existCategory = await CategoryModel.findOne({ categoryName })

    if (existCategory) {
        throw new ErrorHandler('Loại món ăn đã tồn tại', 409)
    }

    let typeImage = imageInfo.originalname.split('.').pop()

    const newImage = await createImage(imageInfo, categoryName, typeImage)

    const newCategory = await CategoryModel.create({
        categoryName,
        image: new Types.ObjectId(newImage._id),
    })

    return { newCategory: { ...newCategory } }
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

export default { getCategory, searchByCategory, createNewCategory }
