import { Types } from 'mongoose'

import ErrorHandler from '../Exception/ErrorHandler.js'
import { CartModel, MealModel } from '../models/index.js'

const getAllMealInCart = async ({ idCart }) => {
    let result = await CartModel.findById(idCart).populate('meals.mealId')

    if (result.length === 0) {
        return res.status(404).json({ error: 'Invalid cartId or mealId' })
    }

    return result._doc
}

const addToCart = async ({ cartId, mealId, quantity, size }) => {
    if (quantity < 0) {
        throw new ErrorHandler('số lượng không < 0.', 400)
    }

    cartId = new Types.ObjectId(cartId)
    mealId = new Types.ObjectId(mealId)

    const cart = await CartModel.findById(cartId)

    if (!cart) {
        throw new ErrorHandler('Giỏ hàng không tồn tại.', 404)
    }

    const meal = await MealModel.findById(mealId)
    if (!meal) {
        throw new ErrorHandler('Món ăn không tồn tại.', 404)
    }

    let priceSize = meal.priceAndSize.find((item) => item.size === size)

    if (!priceSize) {
        throw new ErrorHandler('Trong món ăn không có size này.', 404)
    }

    let mealInCart
    mealInCart = await CartModel.findOneAndUpdate(
        {
            _id: cartId,
            meals: {
                $elemMatch: {
                    mealId: mealId,
                    size: size,
                },
            },
        },
        {
            $inc: { 'meals.$.quantity': quantity },
        },
        {
            new: true,
        },
    )

    if (!mealInCart) {
        mealInCart = await CartModel.findByIdAndUpdate(
            {
                _id: cartId,
            },
            {
                $push: {
                    meals: {
                        mealId,
                        quantity,
                        size,
                    },
                },
            },
            { new: true, upsert: true },
        )
    }

    return mealInCart._doc
}

const updateQuantity = async ({ cartId, mealId, quantity, size }) => {
    if (quantity < 0) {
        throw new ErrorHandler('số lượng không < 0.', 400)
    }

    cartId = new Types.ObjectId(cartId)
    mealId = new Types.ObjectId(mealId)

    const cart = await CartModel.findById(cartId)

    if (!cart) {
        throw new ErrorHandler('Giỏ hàng không tồn tại.', 404)
    }

    const meal = await MealModel.findById(mealId)
    if (!meal) {
        throw new ErrorHandler('Món ăn không tồn tại.', 404)
    }

    let priceSize = meal.priceAndSize.find((item) => item.size === size)

    if (!priceSize) {
        throw new ErrorHandler('Trong món ăn không có size này.', 404)
    }

    let mealInCart
    mealInCart = await CartModel.findOneAndUpdate(
        {
            _id: cartId,
            meals: {
                $elemMatch: {
                    mealId: mealId,
                    size: size,
                },
            },
        },
        {
            $set: {
                'meals.$.quantity': quantity,
            },
        },
        {
            new: true,
        },
    )

    if (!mealInCart) {
        throw new ErrorHandler('Không có món ăn này trong giỏ hàng', 404)
    }

    return mealInCart._doc
}

const countQuantityMeals = async ({cartId}) => {
    const cart = await CartModel.findById(new Types.ObjectId(cartId))

    if (!cart) {
        throw new ErrorHandler('Giỏ hàng không tồn tại.', 404)
    }

    return cart.meals.length
}

const removeFromCart = async ({ cartId, mealId }) => {
    const cart = await CartModel.findById(new Types.ObjectId(cartId))

    if (!cart) {
        throw new ErrorHandler('Giỏ hàng không tồn tại.', 404)
    }

    // Kiểm tra xem mealId có trong giỏ hàng không
    const mealIndex = cart.meals.findIndex((meal) =>
        meal.mealId.equals(new Types.ObjectId(mealId)),
    )
    if (mealIndex === -1) {
        throw new ErrorHandler('Món ăn không có trong giỏ hàng', 404)
    }

    // Xoá mealId từ giỏ hàng nếu nó tồn tại
    cart.meals.splice(mealIndex, 1)
    let result = await cart.save()

    return result
}

export default {
    getAllMealInCart,
    addToCart,
    updateQuantity,
    countQuantityMeals,
    removeFromCart,
}
