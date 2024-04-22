import { deliveryResponsitories } from "../responsitories/index.js"

const createNewDeliveryAddress = async (req, res) => {
    try {
        const { id } = req.user
        const {
            deliveryAddress,
            contactPhoneNumber,
            recipientName,
            isDefault,
        } = req.body

        let newAddress = await deliveryResponsitories.createNewDeliveryAddress({
            idUser: id,
            deliveryAddress: deliveryAddress.trim(),
            contactPhoneNumber: contactPhoneNumber.trim(),
            recipientName: recipientName.trim(),
            isDefault,
        })

        return res.status(200).json({
            newAddress,
            message: 'Thêm mới địa chỉ thành công',
        })
    } catch (error) {
        return res.status(error.statusCode || 404).json({
            message: error.message,
        })
    }
}

const getAllOrder = async (req, res) => {
    try {
        const { id } = req.user

        let allAddress = await deliveryResponsitories.getAllOrder({
            idUser: id,
        })

        return res.status(200).json({
            allAddress,
            message: 'Lấy tất cả địa chỉ thành công',
        })
    } catch (error) {
        return res.status(error.statusCode || 404).json({
            message: error.message,
        })
    }
}

const getDefaultAddress = async (req, res) => {
    try {
        const { id } = req.user

        let defaultAddress = await deliveryResponsitories.getDefaultAddress({
            idUser: id,
        })

        return res.status(200).json({
            defaultAddress,
            message: 'Lấy địa chỉ mặc định thành công',
        })
    } catch (error) {
        return res.status(error.statusCode || 404).json({
            message: error.message,
        })
    }
}

const changeDeliveryAddress = async (req, res) => {
    try {
        const { id } = req.user
        const {idAddress} = req.params
        const {
            deliveryAddress,
            contactPhoneNumber,
            recipientName,
            isDefault,
        } = req.body

        let allAddress = await deliveryResponsitories.changeDeliveryAddress({
            idUser: id,
            idAddress,
            deliveryAddress,
            contactPhoneNumber,
            recipientName,
            isDefault,
        })

        return res.status(200).json({
            allAddress,
            message: 'Cập nhật địa chỉ thành công',
        })
    } catch (error) {
        return res.status(error.statusCode || 404).json({
            message: error.message,
        })
    }
}

const deleteAddress = async (req, res) => {
    try {
        const { id } = req.user
        const { idAddress } = req.params

        let result = await deliveryResponsitories.deleteAddress({
            idUser: id,
            idAddress,
        })

        return res.status(200).json({
            result,
            message: 'Xoá địa chỉ thành công',
        })
    } catch (error) {
        return res.status(error.statusCode || 404).json({
            message: error.message,
        })
    }
}

export default {
    createNewDeliveryAddress,
    getAllOrder,
    getDefaultAddress,
    changeDeliveryAddress,
    deleteAddress,
}
