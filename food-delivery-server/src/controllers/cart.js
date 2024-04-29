import { cartResponsitories } from '../responsitories/index.js'

const getAllMealInCart = async (req, res) => {
    try {
        let { idCart } = req.params
        let { limit, skip } = req.query

        const mealsInCart = await cartResponsitories.getAllMealInCart({
            idCart,
            limit: parseInt(limit),
            skip: parseInt(skip),
        })

        return res.status(200).json({
            mealsInCart,
            message: 'Lấy thành công.',
        })
    } catch (error) {
        return res.status(error.statusCode || 404).json({
            message: error.message,
        })
    }
}

const addToCart = async (req, res) => {
    try {
        let { idCart, idMeal } = req.params
        let { quantity, size } = req.query

        const mealsInCart = await cartResponsitories.addToCart({
            cartId: idCart,
            mealId: idMeal,
            quantity: Number(quantity),
            size,
        })

        return res.status(200).json({
            ...mealsInCart,
            message: 'Thêm vào giỏ hàng thành công',
        })
    } catch (error) {
        return res.status(error.statusCode || 404).json({
            message: error.message,
        })
    }
}

const updateQuantity = async (req, res) => {
    try {
        let { idCart, idMeal } = req.params
        let { quantity, size } = req.query

        const mealsInCart = await cartResponsitories.updateQuantity({
            cartId: idCart,
            mealId: idMeal,
            quantity: Number(quantity),
            size,
        })

        return res.status(200).json({
            ...mealsInCart,
            message: 'Cập nhật số lượng thành công',
        })
    } catch (error) {
        return res.status(error.statusCode || 404).json({
            message: error.message,
        })
    }
}

const countQuantityMeals = async (req, res) => {
    try {
        let { idCart } = req.params

        const quantityMeals = await cartResponsitories.countQuantityMeals({
            cartId: idCart,
        })

        return res.status(200).json({
            quantityMeals,
            message: 'Đếm thành công',
        })
    } catch (error) {
        return res.status(error.statusCode || 404).json({
            message: error.message,
        })
    }
}

const removeFromCart = async (req, res) => {
    try {
        let { idCart, idMeal } = req.params
        let { size, quantity } = req.query

        const resultDelete = await cartResponsitories.removeFromCart({
            cartId: idCart,
            mealId: idMeal,
            size,
            quantity: parseInt(quantity),
        })

        return res.status(200).json({
            resultDelete,
            message: 'Xoá món ăn thành công khỏi giỏ hàng.',
        })
    } catch (error) {
        return res.status(error.statusCode || 404).json({
            message: error.message,
        })
    }
}

const removeManyFromCart = async (req, res) => {
    try {
        let { idCart } = req.params
        let { meals } = req.body

        const resultDelete = await cartResponsitories.removeManyFromCart({
            cartId: idCart,
            meals,
        })

        return res.status(200).json({
            resultDelete,
            message: 'Xoá món ăn thành công khỏi giỏ hàng.',
        })
    } catch (error) {
        return res.status(error.statusCode || 404).json({
            message: error.message,
        })
    }
}

export default {
    getAllMealInCart,
    addToCart,
    removeFromCart,
    removeManyFromCart,
    updateQuantity,
    countQuantityMeals,
}
