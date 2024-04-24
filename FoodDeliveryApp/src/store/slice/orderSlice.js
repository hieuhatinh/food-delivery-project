import { createSlice } from '@reduxjs/toolkit'
import { fetchCreateNewOrder, fetchGetOrders } from '../actions/orderAction'

const initialState = {
    mealsOrder: [],
    orders: [],
    totalPrice: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    messageNotify: null,
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setMealsOrder: (state, action) => {
            state.mealsOrder = action.payload
        },
        setTotalPrice: (state, action) => {
            state.totalPrice = action.payload
        },
        reState: (state, action) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.messageNotify = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCreateNewOrder.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchCreateNewOrder.fulfilled, (state, action) => {
                state.isSuccess = true
                state.messageNotify = action.payload.message
                state.isLoading = false
            })
            .addCase(fetchCreateNewOrder.rejected, (state, action) => {
                state.isError = true
                state.messageNotify = action.payload
                state.isLoading = false
            })
        builder
            .addCase(fetchGetOrders.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchGetOrders.fulfilled, (state, action) => {
                state.isSuccess = true
                state.orders = action.payload.orders
                state.messageNotify = action.payload.message
                state.isLoading = false
            })
            .addCase(fetchGetOrders.rejected, (state, action) => {
                state.isError = true
                state.messageNotify = action.payload
                state.isLoading = false
            })
    },
})

export const { setMealsOrder, setTotalPrice, reState } = orderSlice.actions

export default orderSlice.reducer
