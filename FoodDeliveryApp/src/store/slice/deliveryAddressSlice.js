import { createSlice } from '@reduxjs/toolkit'

import {
    fetchCreateDeliveryAddress,
    fetchDeleteDeliveryAddress,
    fetchGetAllDeliveryAddress,
    fetchGetDefaultAddress,
    fetchUpdateDeliveryAddress,
} from '../actions/deliveryAddressAction'

const initialState = {
    selectedIdAddress: null,
    addresses: [],
    addressDeliveryCurrent: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    messageNotify: null,
}

export const deliveryAddressSlice = createSlice({
    name: 'deliveryAddress',
    initialState,
    reducers: {
        setSelectedIdAddress: (state, action) => {
            state.selectedIdAddress = action.payload
        },
        reState: (state, action) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.messageNotify = null
        },
        setDeliveryAddress: (state, action) => {
            state.addressDeliveryCurrent = state.addresses.find(
                (item) => item._id === state.selectedIdAddress,
            )
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCreateDeliveryAddress.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchCreateDeliveryAddress.fulfilled, (state, action) => {
                state.isSuccess = true
                state.messageNotify = action.payload.message
                state.isLoading = false
            })
            .addCase(fetchCreateDeliveryAddress.rejected, (state, action) => {
                state.isError = true
                state.messageNotify = action.payload
                state.isLoading = false
            })
        builder
            .addCase(fetchGetAllDeliveryAddress.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchGetAllDeliveryAddress.fulfilled, (state, action) => {
                state.isSuccess = true
                state.addresses = action.payload.allAddress
                state.messageNotify = action.payload.message
                state.isLoading = false
            })
            .addCase(fetchGetAllDeliveryAddress.rejected, (state, action) => {
                state.isError = true
                state.messageNotify = action.payload
                state.isLoading = false
            })
        builder
            .addCase(fetchDeleteDeliveryAddress.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchDeleteDeliveryAddress.fulfilled, (state, action) => {
                state.isSuccess = true
                state.messageNotify = action.payload
                state.isLoading = false
            })
            .addCase(fetchDeleteDeliveryAddress.rejected, (state, action) => {
                state.isError = true
                state.messageNotify = action.payload
                state.isLoading = false
            })
        builder
            .addCase(fetchUpdateDeliveryAddress.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchUpdateDeliveryAddress.fulfilled, (state, action) => {
                state.isSuccess = true
                state.messageNotify = action.payload.message
                state.isLoading = false
            })
            .addCase(fetchUpdateDeliveryAddress.rejected, (state, action) => {
                state.isError = true
                state.messageNotify = action.payload
                state.isLoading = false
            })
        builder
            .addCase(fetchGetDefaultAddress.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchGetDefaultAddress.fulfilled, (state, action) => {
                state.isSuccess = true
                state.addressDeliveryCurrent = action.payload.defaultAddress
                state.selectedIdAddress = action.payload.defaultAddress._id
                state.messageNotify = action.payload.message
                state.isLoading = false
            })
            .addCase(fetchGetDefaultAddress.rejected, (state, action) => {
                state.isError = true
                state.messageNotify = action.payload
                state.isLoading = false
            })
    },
})

export const { reState, setSelectedIdAddress, setDeliveryAddress } =
    deliveryAddressSlice.actions

export default deliveryAddressSlice.reducer
