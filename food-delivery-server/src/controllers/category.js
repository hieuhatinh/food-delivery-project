import { categoryResponsitories } from '../responsitories/index.js'

const getCategory = async (req, res) => {
    const limit = parseInt(req.query.limit)

    try {
        const result = await categoryResponsitories.getCategory({ limit })

        return res.status(200).json({
            categories: result,
            message: 'Lấy thông tin thành công',
        })
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        })
    }
}

const searchByCategory = async (req, res) => {
    const limit = parseInt(req.query.limit)
    const { idCategory } = req.params

    try {
        const result = await categoryResponsitories.searchByCategory({
            limit,
            idCategory,
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

const createNewCategory = async (req, res) => {
    const imageInfo = req.file
    const { categoryName } = req.body

    try {
        const result = await categoryResponsitories.createNewCategory({
            categoryName,
            imageInfo,
        })

        return res.status(200).json({
            ...result,
            message: 'Lấy thông tin thành công',
        })
    } catch (error) {
        return res.status(error.statusCode || 404).json({
            message: error.message,
        })
    }
}

export default { getCategory, searchByCategory, createNewCategory }
