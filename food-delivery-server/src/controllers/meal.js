import { mealResponsitories } from '../responsitories/index.js'

const searchMeal = async (req, res) => {
    const limit = parseInt(req.query.limit) || 6
    const { searchValue } = req.query

    try {
        const result = await mealResponsitories.searchMeal({
            limit,
            searchValue,
        })

        return res.status(200).json({
            ...result,
            message: 'Lấy thông tin thành công',
        })
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        })
    }
}

const getDetailMeal = async (req, res) => {
    const { idMeal } = req.params
    try {
        const result = await mealResponsitories.getDetailMeal({
            idMeal,
        })

        return res.status(200).json({
            ...result,
            message: 'Lấy thông tin thành công',
        })
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        })
    }
}

// restaurant
const createMeal = async (req, res) => {
    let artwork = req.file
    const { idRestaurant, idCategory } = req.params
    const { foodName, priceAndSize, describe } = req.body

    let priceAndSizeArr = JSON.parse(priceAndSize).map((item) => ({
        price: Number(item.price),
        size: item.size,
    }))

    try {
        const result = await mealResponsitories.createMeal({
            idRestaurant,
            idCategory,
            foodName,
            priceAndSize: priceAndSizeArr,
            artwork,
            describe,
        })

        return res.status(200).json({
            ...result,
            message: 'Tạo thành công món ăn',
        })
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        })
    }
}

export default { searchMeal, getDetailMeal, createMeal }
