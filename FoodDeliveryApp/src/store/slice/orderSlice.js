import { createSlice } from '@reduxjs/toolkit'
import { fetchCreateDeliveryAddress } from '../actions/orderAction'

const initialState = {
    mealsOrder: [],
    orderInfo: {
        deliveryAddress: null,
        note: null,
        contactPhoneNumber: null,
        recipientName: null,
    },
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
        setOrderInfo: (state, action) => {
            state.orderInfo.contactPhoneNumber =
                action.payload.contactPhoneNumber
            state.orderInfo.deliveryAddress = action.payload.deliveryAddress
            state.orderInfo.recipientName = action.payload.recipientName
        },
        reState: (state, action) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.messageNotify = null
        },
    },
    extraReducers: (builder) => {
    },
})

export const { setMealsOrder, setTotalPrice, reState } = orderSlice.actions

export default orderSlice.reducer
