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

export default { searchMeal }
