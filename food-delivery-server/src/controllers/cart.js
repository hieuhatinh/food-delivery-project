import { cartResponsitories } from '../responsitories/index.js'

const getAllMealInCart = async (req, res) => {
    try {
        let { idCart } = req.params
        const mealsInCart = await cartResponsitories.getAllMealInCart({
            idCart,
        })

        return res.status(200).json({
            ...mealsInCart,
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
            quantity,
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

const removeFromCart = async (req, res) => {
    try {
        let { idCart, idMeal } = req.params

        const resultDelete = await cartResponsitories.removeFromCart({
            cartId: idCart,
            mealId: idMeal,
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

export default { getAllMealInCart, addToCart, removeFromCart, updateQuantity }
