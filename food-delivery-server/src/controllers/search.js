import { searchResponsitories } from '../responsitories/index.js'

const searchByCategory = async (req, res) => {
    const limit = parseInt(req.query.limit)
    const { idCategory } = req.params

    try {
        const meals = await searchResponsitories.searchByCategory({
            limit,
            idCategory,
        })

        return res.status(200).json({
            meals,
            message: 'Lấy thông tin thành công',
        })
    } catch (error) {
        return res.status(error.statusCode || 404).json({
            message: error.message,
        })
    }
}

const searchMeal = async (req, res) => {
    const limit = parseInt(req.query.limit)
    const { searchValue } = req.query

    try {
        const meals = await searchResponsitories.searchMeal({
            limit,
            searchValue,
        })

        return res.status(200).json({
            meals,
            message: 'Lấy thông tin thành công',
        })
    } catch (error) {
        return res.status(error.statusCode || 404).json({
            message: error.message,
        })
    }
}

export default { searchByCategory, searchMeal }
