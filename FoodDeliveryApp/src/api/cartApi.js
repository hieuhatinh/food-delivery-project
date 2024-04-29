import axiosClient from './axiosClient'

import { limit } from '../utils/configLoadData'

const apiGetAllMealsInCart = async ({ idCart, skip }) => {
    try {
        let resultMeals = await axiosClient.get(`/cart/get-all-meal/${idCart}`, {
            params: {
                skip, 
                limit: limit
            }
        })

        return resultMeals.data.mealsInCart
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

const apiDeleteMeal = async ({ idCart, size, quantity, idMeal, typeFetch }) => {
    try {
        let resultMeals = await axiosClient.delete(
            `/cart/delete-meal/${idCart}/${idMeal}`,
            {
                params: {
                    size,
                    quantity,
                },
            },
        )

        return {
            message: resultMeals.data.message,
            typeFetch,
        }
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const apiDeleteManyMeals = async ({ idCart, meals, typeFetch }) => {
    try {
        let resultMeals = await axiosClient.delete(
            `/cart/delete-meal-many/${idCart}`,
            {
                data: { meals: meals },
            },
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
    apiDeleteManyMeals,
    apiCountQuantity,
    apiAddToCart,
}
