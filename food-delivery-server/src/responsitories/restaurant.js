import { Types } from 'mongoose'
import {
    CategoryModel,
    CategoryResModel,
    ImageModel,
    RestautantModel,
} from '../models/index.js'
import ErrorHandler from '../Exception/ErrorHandler.js'
import { createImage } from './image.js'

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
                localField: 'categories_info._id',
                foreignField: 'category',
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
                    restaurantAddress: '$address',
                    restaurantState: '$state',
                    categoryName: '$categories_info.categoryName',
                },
                meals: {
                    $push: {
                        _id: '$meals._id',
                        foodName: '$meals.foodName',
                        price: '$meals.price',
                        size: '$meals.size',
                    },
                },
            },
        },
        {
            $group: {
                _id: '$_id.restaurantId',
                restaurantName: { $first: '$_id.restaurantName' },
                restaurantAddress: { $first: '$_id.restaurantAddress' },
                restaurantState: { $first: '$_id.restaurantState' },
                categories: {
                    $push: {
                        categoryName: '$_id.categoryName',
                        meals: '$meals',
                    },
                },
            },
        },
    ])

    // const info = await CategoryResModel.aggregate([
    //     {
    //         $match: { restaurant: idRestaurant },
    //     },
    //     {
    //         $lookup: {
    //             from: 'categories',
    //             localField: 'category',
    //             foreignField: '_id',
    //             as: 'categories_info',
    //         },
    //     },
    //     {
    //         $lookup: {
    //             from: 'restaurants',
    //             localField: 'restaurant',
    //             foreignField: '_id',
    //             as: 'restaurant_info',
    //         },
    //     },
    //     {
    //         $unwind: '$categories_info',
    //     },
    //     {
    //         $unwind: '$restaurant_info',
    //     },
    //     {
    //         $lookup: {
    //             from: 'meals',
    //             localField: 'categories_info._id',
    //             foreignField: 'category',
    //             as: 'meals',
    //         },
    //     },
    //     {
    //         $group: {
    //             _id: '$restaurant_info._id',
    //             restaurantName: { $first: '$restaurant_info.restaurantName' },
    //             restaurantAddress: {
    //                 $first: '$restaurant_info.address',
    //             },
    //             restaurantState: { $first: '$restaurant_info.state' },
    //             menu: {
    //                 $push: {
    //                     categoryName: '$categories_info.categoryName',
    //                     meals: '$meals',
    //                 },
    //             },
    //         },
    //     },
    // ])

    return { ...info[0] }
}

// tạo quán ăn -> demo
const createRestaurant = async ({
    restaurantName,
    address,
    state,
    imageInfo,
    rate,
    introduce,
}) => {
    const exitRes = await RestautantModel.findOne({ restaurantName, address })

    if (exitRes) {
        throw new ErrorHandler('Quán ăn đã tồn tại', 409)
    }

    let typeImage = imageInfo.originalname.split('.').pop()

    const newImage = await createImage(imageInfo, restaurantName, typeImage)

    const newRes = await RestautantModel.create({
        restaurantName,
        address,
        state,
        image: new Types.ObjectId(newImage._id),
        rate,
        introduce,
    })

    return { ...newRes._doc }
}

export default { getRestaurants, getInfoARestaurant, createRestaurant }
