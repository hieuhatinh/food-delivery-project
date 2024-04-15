import { createSlice } from '@reduxjs/toolkit'

import { fetchDetailRestaurant } from '../actions/restaurantInfoAction'

const initialState = {
    restaurantInfo: {},
    categorySelect: {
        categoryName: null,
        meals: [],
    },
    isLoading: false,
    error: {
        isError: false,
        message: null,
    },
    isSuccess: false,
}

export const restaurantInfoSlice = createSlice({
    name: 'restaurantInfo',
    initialState,
    reducers: {
        setSelectCategory: (state, action) => {
            let result = state.restaurantInfo.categories.find(
                (item) => item.categoryName === action.payload,
            )

            state.categorySelect.categoryName = result.categoryName
            state.categorySelect.meals = result.meals
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDetailRestaurant.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchDetailRestaurant.fulfilled, (state, action) => {
                state.restaurantInfo = action.payload
                state.categorySelect.categoryName = action.payload.categories[0].categoryName
                state.categorySelect.meals = action.payload.categories[0].meals
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(fetchDetailRestaurant.rejected, (state, action) => {
                state.isLoading = false
                state.error = {
                    isError: true,
                    message: null,
                }
            })
    },
})

export const { setSelectCategory } = restaurantInfoSlice.actions

export default restaurantInfoSlice.reducer
