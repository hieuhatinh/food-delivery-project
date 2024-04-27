import { createSlice } from '@reduxjs/toolkit'

import { fetchGetCategoriesName, fetchLoadMoreGetCategories, fetchRefreshGetCategories } from '../actions/categoryAction'
import { limitCategories } from '../../utils/configLoadData'

const initialState = {
    categories: [],
    categoriesName: [],
    isLoading: false,
    isSuccess: false,
    error: {
        isError: false,
        message: null,
    },
    isStopLoadMore: false
}

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRefreshGetCategories.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchRefreshGetCategories.fulfilled, (state, action) => {
                state.categories = action.payload
                state.isStopLoadMore = action.payload.length < limitCategories
                // state.isLoading = false
                // state.isSuccess = true
            })
            .addCase(fetchRefreshGetCategories.rejected, (state, action) => {
                state.error = {
                    isError: true,
                    message: action.payload,
                }
                state.isLoading = false
            })
        builder
            .addCase(fetchLoadMoreGetCategories.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchLoadMoreGetCategories.fulfilled, (state, action) => {
                state.categories.push(...action.payload)
                state.isStopLoadMore = action.payload.length < limitCategories
                // state.isLoading = false
                // state.isSuccess = true
            })
            .addCase(fetchLoadMoreGetCategories.rejected, (state, action) => {
                state.error = {
                    isError: true,
                    message: action.payload,
                }
                state.isLoading = false
            })
        builder
            .addCase(fetchGetCategoriesName.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchGetCategoriesName.fulfilled, (state, action) => {
                state.categoriesName = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(fetchGetCategoriesName.rejected, (state, action) => {
                state.error = {
                    isError: true,
                    message: action.payload,
                }
                state.isLoading = false
            })
    },
})

export const {  } = categoriesSlice.actions

export default categoriesSlice.reducer
