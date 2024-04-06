import { createSlice } from '@reduxjs/toolkit'
import { fetchGetCategories } from '../actions/categoryAction'

const initialState = {
    categories: [],
    isLoading: false,
    isSuccess: false,
    error: {
        isError: false,
        message: null,
    },
}

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        getCategoriesName: (state, action) => {
            return state.categories.data.categories.map((item) => ({
                _id: item._id,
                categoryName: item.categoryName,
            }))
        },
        setCategories: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetCategories.pending, (state, action) => {
                state.isLoading = true
                state.isSuccess = false
                state.error = {
                    isError: false,
                    message: null,
                }
            })
            .addCase(fetchGetCategories.fulfilled, (state, action) => {
                state.categories = action.payload
                state.isLoading = false
                state.isSuccess = true
                state.error = {
                    isError: false,
                    message: null,
                }
            })
            .addCase(fetchGetCategories.rejected, (state, action) => {
                state.error = {
                    isError: true,
                    message: action.payload,
                }
                state.isLoading = false
                state.isSuccess = false
            })
    },
})

export const { getCategoriesName, setCategories } = categoriesSlice.actions

export default categoriesSlice.reducer
