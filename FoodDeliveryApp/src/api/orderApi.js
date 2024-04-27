import axiosClient from './axiosClient'

const apiCreateNewOrder = async (data) => {
    let newOrder = await axiosClient.post('/order/create', {
        ...data
    })

    return newOrder.data
}

const apiGetOrders = async ({state, limit, skip}) => {
    let orders = await axiosClient.get(`/order/get-orders?state=${state}&limit=${limit}&skip=${skip}`)

    return orders.data
}

export { apiCreateNewOrder, apiGetOrders }
