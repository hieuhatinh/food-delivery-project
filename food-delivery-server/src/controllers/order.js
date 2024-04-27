import { orderResponsitories } from '../responsitories/index.js'

const createNewOrder = async (req, res) => {
    try {
        const { id } = req.user
        const {
            state,
            payment,
            deliveryAddress,
            note,
            contactPhoneNumber,
            recipientName,
            meals,
        } = req.body

        let newOrder = await orderResponsitories.createNewOrder({
            idUser: id,
            state,
            payment,
            deliveryAddress,
            note,
            contactPhoneNumber,
            recipientName,
            meals,
        })

        return res.status(200).json({
            newOrder,
            message: 'Tạo đơn đặt hàng thành công',
        })
    } catch (error) {
        return res.status(error.statusCode || 404).json({
            message: error.message,
        })
    }
}

const getOrders = async (req, res) => {
    try {
        const { id } = req.user
        const { state, limit, skip } = req.query

        let orders = await orderResponsitories.getOrders({
            idUser: id,
            state: state.toLowerCase(),
            limit: parseInt(limit),
            skip: parseInt(skip)
        })

        return res.status(200).json({
            orders,
            message: 'Lấy các đơn đặt hàng thành công',
        })
    } catch (error) {
        return res.status(error.statusCode || 404).json({
            message: error.message,
        })
    }
}

export default { createNewOrder, getOrders }
