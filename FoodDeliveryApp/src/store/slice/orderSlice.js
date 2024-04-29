import { createSlice } from '@reduxjs/toolkit'
import { fetchCreateNewOrder, fetchLoadMoreGetOrders, fetchRefreshGetOrders } from '../actions/orderAction'
import { limit } from '../../utils/configLoadData'

const initialState = {
    mealsOrder: [],
    orders: [],
    totalPrice: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    messageNotify: null,
    isStopLoadMore: false,
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
            // state.orders = []
        },
        reStopLoadMore: (state, action) => {
            state.orders = []
            state.isStopLoadMore = false
        }
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
            .addCase(fetchRefreshGetOrders.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchRefreshGetOrders.fulfilled, (state, action) => {
                state.isSuccess = true
                state.isLoading = false
                state.orders = action.payload.orders
                state.isStopLoadMore =
                    action.payload.orders.length < limit
            })
            .addCase(fetchRefreshGetOrders.rejected, (state, action) => {
                state.isError = true
                state.messageNotify = action.payload
                state.isLoading = false
            })
        builder
            .addCase(fetchLoadMoreGetOrders.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchLoadMoreGetOrders.fulfilled, (state, action) => {
                state.isSuccess = true
                state.isLoading = false
                state.orders.push(...action.payload.orders)
                state.isStopLoadMore = action.payload.orders.length < limit
            })
            .addCase(fetchLoadMoreGetOrders.rejected, (state, action) => {
                state.isError = true
                state.messageNotify = action.payload
                state.isLoading = false
            })
    },
})

export const { setMealsOrder, setTotalPrice, reState, reStopLoadMore } =
    orderSlice.actions

export default orderSlice.reducer
