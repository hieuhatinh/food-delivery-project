import axiosClient from './axiosClient'

const apiGetDetailRes = async ({ idRestaurant }) => {
    try {
        let res = await axiosClient.get(`/restaurant/${idRestaurant}/get-info`)

        return res.data.restaurantInfo
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const apiGetOpenRes = async ({ limit, state }) => {
    try {
        let openRes = await axiosClient.get('/restaurant/get-restaurants', {
            params: {
                state,
                limit,
            },
        })

        return openRes.data.restaurants
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export { apiGetDetailRes, apiGetOpenRes }
