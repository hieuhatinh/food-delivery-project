import { createAsyncThunk } from '@reduxjs/toolkit'

import {
    apiAddToCart,
    apiCountQuantity,
    apiDeleteManyMeals,
    apiDeleteMeal,
    apiGetAllMealsInCart,
    apiUpdateQuantity,
} from '../../api/cartApi'

const fetchRefreshGetAllMealsInCart = createAsyncThunk(
    'cart/fetchRefreshGetAllMealsInCart',
    async ({ idCart, limit }, { rejectWithValue }) => {
        try {
            let result = await apiGetAllMealsInCart({ idCart, limit, skip: 0 })

            return result
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

const fetchLoadMoreGetAllMealsInCart = createAsyncThunk(
    'cart/fetchLoadMoreGetAllMealsInCart',
    async ({ idCart, limit, skip }, { rejectWithValue }) => {
        try {
            let result = await apiGetAllMealsInCart({ idCart, limit, skip })

            return result
        } catch (error) {
            return rejectWithValue(error.message)
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
            let result = await apiUpdateQuantity({
                idCart,
                idMeal,
                quantity,
                size,
                typeFetch,
            })

            return result
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

const fetchDeleteMeal = createAsyncThunk(
    'cart/fetchDeleteMeal',
    async (
        { idCart, size, quantity, idMeal, typeFetch },
        { rejectWithValue },
    ) => {
        try {
            let result = await apiDeleteMeal({
                idCart,
                size,
                quantity,
                idMeal,
                typeFetch,
            })

            return result
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

const fetchDeleteManyMeals = createAsyncThunk(
    'cart/fetchDeleteManyMeals',
    async ({ idCart, mealsOrder, typeFetch }, { rejectWithValue }) => {
        try {
            let mealsId = mealsOrder.map((item) => item.mealId)
            let result = await apiDeleteManyMeals({
                idCart,
                mealsId,
                typeFetch,
            })

            return result
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

const fetchCountQuantity = createAsyncThunk(
    'cart/fetchCountQuantity',
    async ({ idCart }, { rejectWithValue }) => {
        try {
            let result = await apiCountQuantity({ idCart })

            return result
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

const fetchAddToCart = createAsyncThunk(
    'cart/fetchAddToCart',
    async (
        { idCart, idMeal, quantity, size, typeFetch },
        { rejectWithValue },
    ) => {
        try {
            let result = await apiAddToCart({
                idCart,
                idMeal,
                quantity,
                size,
                typeFetch,
            })

            return result
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

export {
    fetchRefreshGetAllMealsInCart,
    fetchLoadMoreGetAllMealsInCart,
    fetchUpdateQuantity,
    fetchDeleteMeal,
    fetchDeleteManyMeals,
    fetchCountQuantity,
    fetchAddToCart,
}
