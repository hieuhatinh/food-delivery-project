import ErrorHandler from '../Exception/ErrorHandler.js'
import { CategoryModel } from '../models/index.js'

const getCategory = async ({ limit, skip }) => {
    const categories = await CategoryModel.find()
        .sort({ categoryName: 1 })
        .skip(skip)
        .limit(limit)
    
    return categories
}

const getCategoriesName = async () => {
    const categoriesName = await CategoryModel.find().select('_id categoryName')

    return categoriesName
}

const createNewCategory = async ({ categoryName, imageInfo }) => {
    const existCategory = await CategoryModel.findOne({ categoryName })

    if (existCategory) {
        throw new ErrorHandler('Loại món ăn đã tồn tại', 409)
    }

    const newCategory = await CategoryModel.create({
        categoryName,
        image: {
            fileName: imageInfo.originalname,
            path: imageInfo.path,
            mimetype: imageInfo.mimetype,
        },
    })

    return { newCategory: { ...newCategory._doc } }
}

export default { getCategory, createNewCategory, getCategoriesName }
