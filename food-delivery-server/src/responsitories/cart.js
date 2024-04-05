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

const addToCart = async ({ cartId, mealId, quantity }) => {
    const cart = await CartModel.findById(new Types.ObjectId(cartId))

    if (!cart) {
        throw new ErrorHandler('Giỏ hàng không tồn tại.', 404)
    }

    const meal = await MealModel.findById(new Types.ObjectId(mealId))
    if (!meal) {
        throw new ErrorHandler('Món ăn không tồn tại.', 404)
    }

    let mealInCart
    mealInCart = await CartModel.findOneAndUpdate(
        {
            _id: cartId,
            'meals.mealId': mealId,
        },
        {
            $set: { 'meals.$.quantity': quantity },
        },
        {
            new: true,
        },
    )

    if (!mealInCart) {
        mealInCart = await CartModel.findByIdAndUpdate(
            {
                cartId,
            },
            {
                $push: { meals: { mealId, quantity } },
            },
            { new: true, upsert: true },
        )
    }

    return mealInCart._doc
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

export default { getAllMealInCart, addToCart, removeFromCart }
