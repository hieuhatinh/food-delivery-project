import { Types } from 'mongoose'

import ErrorHandler from '../Exception/ErrorHandler.js'
import { CategoryModel, MealModel } from '../models/index.js'
import { createImage } from './image.js'

const getCategory = async ({ limit }) => {
    const categories = await CategoryModel.find()
        .populate({
            path: 'image',
            select: {
                file: {
                    data: {
                        $toString: 'base64',
                    },
                    // data: '$file.data',
                    contentType: '$file.contentType',
                },
                fileName: '$fileName',
            },
        })
        .limit(limit)

    return categories
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

const createNewCategory = async ({ categoryName, imageInfo }) => {
    const existCategory = await CategoryModel.findOne({ categoryName })

    if (existCategory) {
        throw new ErrorHandler('Loại món ăn đã tồn tại', 409)
        // throw new Error('Loại món ăn đã tồn tại')
    }

    const newImage = await createImage(imageInfo, categoryName)

    const newCategory = await CategoryModel.create({
        categoryName,
        image: new Types.ObjectId(newImage._id),
    })

    return { newCategory: { ...newCategory._doc } }
}

export default { getCategory, searchByCategory, createNewCategory }
