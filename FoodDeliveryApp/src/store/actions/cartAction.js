import { createAsyncThunk } from '@reduxjs/toolkit'

import axiosClient from '../../api/axiosClient'

const fetchGetAllMealsInCart = createAsyncThunk(
    'cart/fetchGetAllMealsInCart',
    async ({ idCart }, { rejectWithValue }) => {
        try {
            let resultMeals = await axiosClient.get(
                `/cart/get-all-meal/${idCart}`,
            )

            return resultMeals.data.meals
        } catch (error) {
            rejectWithValue(error.response.data.message)
        }
    },
)

const fetchUpdateQuantity = createAsyncThunk(
    'cart/fetchUpdateQuantity',
    async (
        { idCart, idMeal, quantity, size, typeFetch },
        { rejectWithValue },
    ) => {
        try {
            let resultMeals = await axiosClient.patch(
                `/cart/update-quantity/${idCart}/${idMeal}?quantity=${quantity}&size=${size}`,
            )

            return {
                meals: resultMeals.data.meals,
                typeFetch,
            }
        } catch (error) {
            rejectWithValue(error.response.data.message)
        }
    },
)

const fetchDeleteMeal = createAsyncThunk(
    'cart/fetchDeleteMeal',
    async ({ idCart, idMeal, typeFetch }, { rejectWithValue }) => {
        try {
            let resultMeals = await axiosClient.delete(
                `/cart/delete-meal/${idCart}/${idMeal}`,
            )

            return {
                message: resultMeals.data.message,
                typeFetch,
            }
        } catch (error) {
            rejectWithValue(error.response.data.message)
        }
    },
)

const fetchCountQuantity = createAsyncThunk(
    'cart/fetchCountQuantity',
    async ({ idCart }, { rejectWithValue }) => {
        try {
            let result = await axiosClient.get(
                `/cart/count-quantity-meals/${idCart}`,
            )

            return result.data.quantityMeals
        } catch (error) {
            rejectWithValue(error.response.data.message)
        }
    },
)

export {
    fetchGetAllMealsInCart,
    fetchUpdateQuantity,
    fetchDeleteMeal,
    fetchCountQuantity,
}
