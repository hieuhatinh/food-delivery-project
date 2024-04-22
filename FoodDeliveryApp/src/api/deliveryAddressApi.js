import axiosClient from './axiosClient'

let apiCreateDeliveryAddress = async ({
    deliveryAddress,
    contactPhoneNumber,
    recipientName,
    isDefault,
}) => {
    try {
        let newAddress = await axiosClient.post('/delivery-address/create', {
            deliveryAddress,
            contactPhoneNumber,
            recipientName,
            isDefault,
        })

        return newAddress.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const apiGetAllDeliveryAddress = async () => {
    try {
        let allAddress = await axiosClient.get('/delivery-address/get-all')

        return allAddress.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const apiGetDefaultAddress = async () => {
    try {
        let defaultAddress = await axiosClient.get('/delivery-address/get-default')

        return defaultAddress.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const apiDeleteDeliveryAddress = async ({ idAddress }) => {
    try {
        let result = await axiosClient.delete(
            `/delivery-address/delete/${idAddress}`,
        )

        return result.data.message
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const apiUpdateDeliveryAddress = async ({
    idAddress,
    deliveryAddress,
    contactPhoneNumber,
    recipientName,
    isDefault,
}) => {
    try {
        let result = await axiosClient.put(
            `/delivery-address/change/${idAddress}`,
            { deliveryAddress, contactPhoneNumber, recipientName, isDefault },
        )

        return result.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export {
    apiCreateDeliveryAddress,
    apiGetAllDeliveryAddress,
    apiGetDefaultAddress,
    apiDeleteDeliveryAddress,
    apiUpdateDeliveryAddress,
}
