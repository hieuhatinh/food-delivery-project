import axiosClient from './axiosClient'

const apiGetDetailMeal = async ({ idMeal }) => {
    try {
        let mealInfo = await axiosClient.get(`/meal/${idMeal}/detail`)

        return mealInfo.data.mealInfo
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export { apiGetDetailMeal }
