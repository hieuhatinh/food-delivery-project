import { createSlice } from "@reduxjs/toolkit"
import { fetchSearchByCategory, fetchSearchByName } from "../actions/searchAction"

const initialState = {
    meals: [],
    isLoading: false,
    isSuccess: false,
    error: {
        isError: false,
        message: null,
    },
}

export const searchSlice = createSlice({
    name: 'search', 
    initialState, 
    reducers: {

    }, 
    extraReducers: builder => {
        builder
            .addCase(fetchSearchByName.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchSearchByName.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.meals = action.payload
            })
            .addCase(fetchSearchByName.rejected, (state, action) => {
                state.isLoading = false
                state.error = {
                    isError: true,
                    message: null,
                }
            })
        builder
            .addCase(fetchSearchByCategory.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchSearchByCategory.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.meals = action.payload
            })
            .addCase(fetchSearchByCategory.rejected, (state, action) => {
                state.isLoading = false
                state.error = {
                    isError: true,
                    message: null,
                }
            })
    }
})

export default searchSlice.reducer