import { createSlice } from '@reduxjs/toolkit'

import { fetchOpenRes } from '../actions/restaurantAction'

const initialState = {
    restaurants: [],
    isLoading: false,
    error: {
        isError: false,
        message: null,
    },
    isSuccess: false,
}

export const restaurantsSlice = createSlice({
    name: 'restaurants',
    initialState,
    reducers: {
        setRestaurants(state, action) {
            return action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOpenRes.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchOpenRes.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.restaurants = action.payload
            })
            .addCase(fetchOpenRes.rejected, (state, action) => {
                state.isLoading = false
               state.error = {
                   isError: true,
                   message: null,
               }
            })
    },
})

export const { setRestaurants } = restaurantsSlice.actions

export default restaurantsSlice.reducer
