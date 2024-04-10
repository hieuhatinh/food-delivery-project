import { orderResponsitories } from "../responsitories/index.js"

const createNewOrder = async (req, res) => {
    try {
        const { idUser } = req.params
        const {
            state,
            payment,
            deliveryAddress,
            note,
            contactPhoneNumber,
            meals,
        } = req.body

        let newOrder = await orderResponsitories.createNewOrder({
            idUser,
            state,
            payment,
            deliveryAddress,
            note,
            contactPhoneNumber,
            meals,
        })

        return res.status(200).json({
            newOrder, 
            message: 'Tạo đơn đặt hàng thành công'
        })
    } catch (error) {
        return res.status(error.statusCode || 404).json({
            message: error.message,
        })
    }
}

export default { createNewOrder }
