import { createAsyncThunk } from '@reduxjs/toolkit'

import {
    apiAddToCart,
    apiCountQuantity,
    apiDeleteMeal,
    apiGetAllMealsInCart,
    apiUpdateQuantity,
} from '../../api/cartApi'

const fetchGetAllMealsInCart = createAsyncThunk(
    'cart/fetchGetAllMealsInCart',
    async ({ idCart }, { rejectWithValue }) => {
        try {
            let result = await apiGetAllMealsInCart({ idCart })

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
    async ({ idCart, idMeal, typeFetch }, { rejectWithValue }) => {
        try {
            let result = await apiDeleteMeal({ idCart, idMeal, typeFetch })

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
    fetchGetAllMealsInCart,
    fetchUpdateQuantity,
    fetchDeleteMeal,
    fetchCountQuantity,
    fetchAddToCart,
}
