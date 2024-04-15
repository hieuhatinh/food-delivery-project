import { Types } from 'mongoose'

import { RestautantModel } from '../models/index.js'
import ErrorHandler from '../Exception/ErrorHandler.js'

const getRestaurants = async ({ limit, state }) => {
    const restaurants = await RestautantModel.find({
        state: state ? state : { $exists: true },
    })
        .populate('categories', '_id categoryName')
        .limit(limit)

    return restaurants
}

// lấy thông tin quán ăn
const getInfoARestaurant = async ({ idRestaurant }) => {
    idRestaurant = new Types.ObjectId(idRestaurant)

    const info = await RestautantModel.aggregate([
        {
            $match: { _id: idRestaurant },
        },
        {
            $lookup: {
                from: 'categories',
                localField: '_id',
                foreignField: 'restaurants',
                as: 'categories_info',
            },
        },
        {
            $unwind: '$categories_info',
        },
        {
            $lookup: {
                from: 'meals',
                let: {
                    categoryId: '$categories_info._id',
                    restaurantId: '$_id',
                },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ['$category', '$$categoryId'] },
                                    { $eq: ['$restaurant', '$$restaurantId'] },
                                ],
                            },
                        },
                    },
                ],
                as: 'meals',
            },
        },
        {
            $unwind: '$meals',
        },
        {
            $group: {
                _id: {
                    restaurantId: '$_id',
                    restaurantName: '$restaurantName',
                    image: '$image',
                    address: '$address',
                    state: '$state',
                    rate: '$rate',
                    introduce: '$introduce',
                    categoryName: '$categories_info.categoryName',
                },
                meals: {
                    $push: {
                        _id: '$meals._id',
                        foodName: '$meals.foodName',
                        priceAndSize: '$meals.priceAndSize',
                        artwork: '$meals.artwork',
                    },
                },
            },
        },
        {
            $group: {
                _id: '$_id.restaurantId',
                restaurantName: { $first: '$_id.restaurantName' },
                address: { $first: '$_id.address' },
                state: { $first: '$_id.state' },
                image: { $first: '$_id.image' },
                rate: { $first: '$_id.rate' },
                introduce: { $first: '$_id.introduce' },
                categories: {
                    $push: {
                        categoryName: '$_id.categoryName',
                        meals: '$meals',
                    },
                },
            },
        },
    ])

    return { ...info[0] }
}

// tạo quán ăn -> demo
const createRestaurant = async ({
    restaurantName,
    address,
    state,
    rate,
    introduce,
    imageInfo,
}) => {
    const exitRes = await RestautantModel.findOne({ restaurantName, address })

    if (exitRes) {
        throw new ErrorHandler('Quán ăn đã tồn tại', 409)
    }

    const newRes = await RestautantModel.create({
        restaurantName,
        address,
        state,
        image: {
            fileName: imageInfo.originalname,
            path: imageInfo.path,
            mimetype: imageInfo.mimetype,
        },
        rate,
        introduce,
    })

    return { ...newRes._doc }
}

export default { getRestaurants, getInfoARestaurant, createRestaurant }
