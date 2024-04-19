import axiosClient from './axiosClient'

const apiGetAllMealsInCart = async ({ idCart }) => {
    try {
        let resultMeals = await axiosClient.get(`/cart/get-all-meal/${idCart}`)

        return resultMeals.data.meals
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const apiUpdateQuantity = async ({
    idCart,
    idMeal,
    quantity,
    size,
    typeFetch,
}) => {
    try {
        let resultMeals = await axiosClient.patch(
            `/cart/update-quantity/${idCart}/${idMeal}?quantity=${quantity}&size=${size}`,
        )

        return {
            meals: resultMeals.data.meals,
            typeFetch,
        }
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const apiDeleteMeal = async ({ idCart, idMeal, typeFetch }) => {
    try {
        let resultMeals = await axiosClient.delete(
            `/cart/delete-meal/${idCart}/${idMeal}`,
        )

        return {
            message: resultMeals.data.message,
            typeFetch,
        }
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const apiCountQuantity = async ({ idCart }) => {
    try {
        let result = await axiosClient.get(
            `/cart/count-quantity-meals/${idCart}`,
        )

        return result.data.quantityMeals
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const apiAddToCart = async ({ idCart, idMeal, quantity, size, typeFetch }) => {
    try {
        let result = await axiosClient.patch(
            `/cart/add/${idCart}/${idMeal}?quantity=${quantity}&size=${size}`,
        )

        return {
            message: result.data.message,
            typeFetch,
        }
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export {
    apiGetAllMealsInCart,
    apiUpdateQuantity,
    apiDeleteMeal,
    apiCountQuantity,
    apiAddToCart,
}
