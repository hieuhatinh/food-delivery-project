import { restaurantResponsitories } from '../responsitories/index.js'

const getRestaurants = async (req, res) => {
    const {limit, state, skip} = req.query

    try {
        const result = await restaurantResponsitories.getRestaurants({
            limit: parseInt(limit),
            state,
            skip: parseInt(skip),
        })

        return res.status(200).json({
            restaurants: result,
            message: 'Lấy thông tin thành công',
        })
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        })
    }
}

const getInfoARestaurant = async (req, res) => {
    const { idRestaurant } = req.params

    try {
        const result = await restaurantResponsitories.getInfoARestaurant({
            idRestaurant,
        })

        return res.status(200).json({
            restaurantInfo: result,
            message: 'Lấy thông tin thành công',
        })
    } catch (error) {
        return res.status(error.statusCode).json({
            message: error.message,
        })
    }
}

const createRestaurant = async (req, res) => {
    const imageInfo = req.file
    const { restaurantName, address, state, rate, introduce } = req.body

    try {
        const result = await restaurantResponsitories.createRestaurant({
            restaurantName,
            address,
            state,
            rate: Number(rate),
            introduce,
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

export default { getRestaurants, getInfoARestaurant, createRestaurant }
