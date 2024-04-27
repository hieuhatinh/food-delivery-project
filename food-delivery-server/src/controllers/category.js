import { categoryResponsitories } from '../responsitories/index.js'

const getCategory = async (req, res) => {
    const limit = parseInt(req.query.limit)
    const skip = parseInt(req.query.skip)

    try {
        const result = await categoryResponsitories.getCategory({ limit, skip })

        return res.status(200).json({
            categories: result,
            message: 'Lấy thông tin thành công',
        })
    } catch (error) {
        return res.status(error.statusCode || 404).json({
            message: error.message,
        })
    }
}

const getCategoriesName = async (req, res) => {
    try {
        const result = await categoryResponsitories.getCategoriesName()

        return res.status(200).json({
            categoriesName: result,
            message: 'Lấy thông tin thành công',
        })
    } catch (error) {
        return res.status(error.statusCode || 404).json({
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

export default { getCategory, createNewCategory, getCategoriesName }
