import { restaurantResponsitories } from '../responsitories/index.js'

const getRestaurants = async (req, res) => {
    const limit = parseInt(req.query.limit)
    const state = req.query.state

    try {
        const result = await restaurantResponsitories.getRestaurants({
            limit,
            state,
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

export default { getRestaurants }
