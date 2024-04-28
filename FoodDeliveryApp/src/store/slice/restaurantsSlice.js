import { createSlice } from '@reduxjs/toolkit'

import { fetchLoadMoreOpenRes, fetchRefreshOpenRes } from '../actions/restaurantAction'

import { limit, typeRefresh, typeLoadMore } from '../../utils/configLoadData'

const initialState = {
    restaurants: [],
    isLoading: false,
    error: {
        isError: false,
        message: null,
    },
    isSuccess: false,
    isStopLoadMore: false,
}

export const restaurantsSlice = createSlice({
    name: 'restaurants',
    initialState,
    reducers: {
        reStopLoadMore: (state, action) => {
            state.isStopLoadMore = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRefreshOpenRes.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchRefreshOpenRes.fulfilled, (state, action) => {
                state.restaurants = action.payload
                state.isStopLoadMore = action.payload.length < limit
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(fetchRefreshOpenRes.rejected, (state, action) => {
                state.isLoading = false
                state.error = {
                    isError: true,
                    message: null,
                }
            })
        builder
            .addCase(fetchLoadMoreOpenRes.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchLoadMoreOpenRes.fulfilled, (state, action) => {
                state.restaurants.push(...action.payload)
                state.isStopLoadMore = action.payload.length < limit
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(fetchLoadMoreOpenRes.rejected, (state, action) => {
                state.isLoading = false
                state.error = {
                    isError: true,
                    message: null,
                }
            })
    },
})

export const { reStopLoadMore } = restaurantsSlice.actions

export default restaurantsSlice.reducer
