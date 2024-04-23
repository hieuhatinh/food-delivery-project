import ErrorHandler from '../Exception/ErrorHandler.js'
import DeliveryAddressModel from '../models/DeliveryAddress.js'

const createNewDeliveryAddress = async ({
    idUser,
    deliveryAddress,
    contactPhoneNumber,
    recipientName,
    isDefault,
}) => {
    const newAddress = await DeliveryAddressModel.create({
        idUser,
        deliveryAddress,
        contactPhoneNumber,
        recipientName,
        isDefault,
    })

    if (newAddress.isDefault === true) {
        await DeliveryAddressModel.updateMany(
            { _id: { $ne: newAddress._id } },
            {
                isDefault: false,
            },
        )
    }

    return newAddress
}

const getAllOrder = async ({ idUser }) => {
    const allAddress = await DeliveryAddressModel.find({
        idUser,
    })

    return allAddress
}

const getDefaultAddress = async ({ idUser }) => {
    const defaultAddress = await DeliveryAddressModel.findOne({
        idUser,
        isDefault: true,
    })

    return defaultAddress
}

const changeDeliveryAddress = async ({
    idUser,
    idAddress,
    deliveryAddress,
    contactPhoneNumber,
    recipientName,
    isDefault,
}) => {
    const existAddress = await DeliveryAddressModel.findOne({
        $and: [{ _id: idAddress }, { idUser }],
    })

    if (!existAddress) {
        throw new ErrorHandler('Địa chỉ không tồn tại', 404)
    }

    const updateAddress = await DeliveryAddressModel.updateOne(
        {
            $and: [{ _id: idAddress }, { idUser }],
        },
        {
            deliveryAddress,
            contactPhoneNumber,
            recipientName,
            isDefault,
        },
    )

    if (isDefault === true) {
        await DeliveryAddressModel.updateMany(
            { _id: { $ne: idAddress } },
            {
                isDefault: false,
            },
        )
    }

    return updateAddress
}

const deleteAddress = async ({ idUser, idAddress }) => {
    const existAddress = await DeliveryAddressModel.findOne({
        $and: [{ idUser }, { _id: idAddress }],
    })

    if (!existAddress) {
        throw new ErrorHandler('Không tồn tại địa chỉ này', 404)
    }

    let count = await DeliveryAddressModel.countDocuments({ idUser })

    if (existAddress.isDefault === true && count > 1) {
        throw new ErrorHandler('Không thể xoá địa chỉ mặc định', 403)
    }

    let result = await existAddress.deleteOne()

    return result
}

export default {
    createNewDeliveryAddress,
    getAllOrder,
    getDefaultAddress,
    changeDeliveryAddress,
    deleteAddress,
}
