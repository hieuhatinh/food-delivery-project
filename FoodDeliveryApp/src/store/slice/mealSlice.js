import { createSlice } from '@reduxjs/toolkit'

import { fetchMealDetail } from '../actions/mealAction'

const initialState = {
    mealInfo: {},
    sizeAndQuantity: {
        quantity: 1,
        price: null,
        size: null,
    },
    isLoading: false,
    error: {
        isError: false,
        message: null,
    },
    isSuccess: false,
}

export const mealSlice = createSlice({
    name: 'meal',
    initialState,
    reducers: {
        setQuantity: (state, action) => {
            state.sizeAndQuantity.quantity = action.payload
            
        },
        setSize: (state, action) => {
            state.sizeAndQuantity.size = action.payload
            state.sizeAndQuantity.price = state.mealInfo?.priceAndSize.find(
                (item) => item.size === action.payload,
            ).price
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMealDetail.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchMealDetail.fulfilled, (state, action) => {
                state.mealInfo = action.payload
                state.sizeAndQuantity.size = action.payload.priceAndSize[0].size
                state.sizeAndQuantity.price =
                    action.payload.priceAndSize[0].price
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(fetchMealDetail.rejected, (state, action) => {
                state.isLoading = false
                state.error = {
                    isError: true,
                    message: null,
                }
            })
    },
})

export const { setQuantity, setSize } = mealSlice.actions

export default mealSlice.reducer
