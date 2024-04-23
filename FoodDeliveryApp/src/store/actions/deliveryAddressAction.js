import { createAsyncThunk } from '@reduxjs/toolkit'

import {
    apiCreateDeliveryAddress,
    apiGetAllDeliveryAddress,
    apiDeleteDeliveryAddress,
    apiUpdateDeliveryAddress,
    apiGetDefaultAddress,
} from '../../api/deliveryAddressApi'

const fetchCreateDeliveryAddress = createAsyncThunk(
    'deliveryAddress/fetchCreateDeliveryAddress',
    async (
        { deliveryAddress, contactPhoneNumber, recipientName, isDefault },
        { rejectWithValue },
    ) => {
        try {
            let newAddress = await apiCreateDeliveryAddress({
                deliveryAddress,
                contactPhoneNumber,
                recipientName,
                isDefault,
            })

            return newAddress
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

const fetchGetAllDeliveryAddress = createAsyncThunk(
    'deliveryAddress/fetchGetAllDeliveryAddress',
    async(_, {rejectWithValue}) => {
        try {
            let allAddress = await apiGetAllDeliveryAddress()

            return allAddress
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const fetchGetDefaultAddress = createAsyncThunk(
    'deliveryAddress/fetchGetDefaultAddress',
    async (_, { rejectWithValue }) => {
        try {
            let defaultAddress = await apiGetDefaultAddress()

            return defaultAddress
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

const fetchDeleteDeliveryAddress = createAsyncThunk(
    'deliveryAddress/fetchDeleteDeliveryAddress',
    async ({ idAddress }, { rejectWithValue }) => {
        try {
            let result = await apiDeleteDeliveryAddress({ idAddress })

            return result
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

const fetchUpdateDeliveryAddress = createAsyncThunk(
    'deliveryAddress/fetchUpdateDeliveryAddress',
    async (
        {
            idAddress,
            deliveryAddress,
            contactPhoneNumber,
            recipientName,
            isDefault,
        },
        { rejectWithValue },
    ) => {
        try {
            let result = await apiUpdateDeliveryAddress({
                idAddress,
                deliveryAddress,
                contactPhoneNumber,
                recipientName,
                isDefault,
            })

            return result
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

export {
    fetchCreateDeliveryAddress,
    fetchGetAllDeliveryAddress,
    fetchGetDefaultAddress,
    fetchDeleteDeliveryAddress,
    fetchUpdateDeliveryAddress,
}
