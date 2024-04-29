import axiosClient from './axiosClient'

const apiCreateNewOrder = async (data) => {
    try {
        let newOrder = await axiosClient.post('/order/create', {
            ...data,
        })

        return newOrder.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const apiGetOrders = async ({ state, limit, skip }) => {
    try {
        let orders = await axiosClient.get(
            `/order/get-orders?state=${state}&limit=${limit}&skip=${skip}`,
        )

        return orders.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export { apiCreateNewOrder, apiGetOrders }
