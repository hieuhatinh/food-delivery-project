import { createSlice } from '@reduxjs/toolkit'

import {
    fetchGetAllMealsInCart,
    fetchUpdateQuantity,
    fetchDeleteMeal,
} from '../actions/cartAction'

const initialState = {
    mealsInCart: {
        meals: [],
        isCheckedAll: false,
    },
    isLoading: false,
    isSuccess: false,
    messageSuccess: null,
    error: {
        isError: false,
        message: null,
    },
    typeFetch: null
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setQuantityMeal: (state, action) => {
            let { _id, quantity } = action.payload
            let meal = state.mealsInCart.meals.find((item) => item.mealId._id === _id)
            meal.quantity = quantity
        },
        setSelectAll: (state, action) => {
            state.mealsInCart.isCheckedAll = action.payload
            state.mealsInCart.meals = state.mealsInCart.meals.map((item) => ({
                ...item,
                isChecked: action.payload,
            }))
        },
        setSelectItem: (state, action) => {
            let { _id, isChecked } = action.payload
            let meal = state.mealsInCart.meals.find(
                (item) => item.mealId._id === _id,
            )
            meal.isChecked = isChecked
            state.mealsInCart.isCheckedAll =
                state.mealsInCart.meals.reduce((totalItemChecked, item) => {
                    return item.isChecked && ++totalItemChecked
                }, 0) === state.mealsInCart.meals.length
        },
        removeItemFromCart: (state, action) => {
            state.mealsInCart.meals = state.mealsInCart.meals.filter(
                (item) => item.mealId._id !== action.payload,
            )
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetAllMealsInCart.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchGetAllMealsInCart.fulfilled, (state, action) => {
                state.isSuccess = true
                state.mealsInCart.meals = action.payload.map((item) => ({
                    ...item,
                    isChecked: false,
                }))
                state.isLoading = false
            })
            .addCase(fetchGetAllMealsInCart.rejected, (state, action) => {
                state.isLoading = false
                state.error.isError = true
                state.error.message = action.payload
            })
        builder
            .addCase(fetchUpdateQuantity.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchUpdateQuantity.fulfilled, (state, action) => {
                state.isSuccess = true
                state.typeFetch = action.payload.typeFetch
                state.isLoading = false
            })
            .addCase(fetchUpdateQuantity.rejected, (state, action) => {
                state.error.isError = true
                state.error.message = action.payload
                state.isLoading = false
            })
        builder
            .addCase(fetchDeleteMeal.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchDeleteMeal.fulfilled, (state, action) => {
                state.isSuccess = true
                state.messageSuccess = action.payload.message
                state.typeFetch = action.payload.typeFetch
                state.isLoading = false
            })
            .addCase(fetchDeleteMeal.rejected, (state, action) => {
                state.error.isError = true
                state.error.message = action.payload
                state.isLoading = false
            })
    },
})

export const {
    setQuantityMeal,
    setSelectAll,
    setSelectItem,
    removeItemFromCart,
} = cartSlice.actions

export default cartSlice.reducer
