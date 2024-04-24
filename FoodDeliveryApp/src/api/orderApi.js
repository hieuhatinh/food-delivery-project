import axiosClient from './axiosClient'

const apiCreateNewOrder = async (data) => {
    let newOrder = await axiosClient.post('/order/create', {
        ...data
    })

    return newOrder.data
}

const apiGetOrders = async ({state}) => {
    let orders = await axiosClient.get(`/order/get-orders?state=${state}`)

    return orders.data
}

export { apiCreateNewOrder, apiGetOrders }
