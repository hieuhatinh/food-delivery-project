import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiCreateNewOrder, apiGetOrders } from '../../api/orderApi'

const fetchCreateNewOrder = createAsyncThunk(
    'order/fetchCreateNewOrder',
    async (
        { meals, deliveryAddress, contactPhoneNumber, recipientName },
        { rejectWithValue },
    ) => {
        try {
            let newAddress = await apiCreateNewOrder({
                meals,
                payment: 'cash',
                deliveryAddress,
                contactPhoneNumber,
                recipientName,
            })

            return newAddress
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

const fetchGetOrders = createAsyncThunk(
    'order/fetchGetOrders',
    async ({ state }, { rejectWithValue }) => {
        try {
            let newAddress = await apiGetOrders({
                state,
            })

            return newAddress
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

export { fetchCreateNewOrder, fetchGetOrders }
