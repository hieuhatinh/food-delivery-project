import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiCreateNewOrder, apiGetOrders } from '../../api/orderApi'

const fetchCreateNewOrder = createAsyncThunk(
    'order/fetchCreateNewOrder',
    async (
        { meals, deliveryAddress, contactPhoneNumber, recipientName },
        { rejectWithValue },
    ) => {
        try {
            let newOrder = await apiCreateNewOrder({
                meals,
                payment: 'cash',
                deliveryAddress,
                contactPhoneNumber,
                recipientName,
            })

            return newOrder
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

const fetchRefreshGetOrders = createAsyncThunk(
    'order/fetchRefreshGetOrders',
    async ({ state, limit }, { rejectWithValue }) => {
        try {
            let orders = await apiGetOrders({
                state,
                limit,
                skip: 0,
            })

            return orders
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

const fetchLoadMoreGetOrders = createAsyncThunk(
    'order/fetchLoadMoreGetOrders',
    async ({ state, limit, skip }, { rejectWithValue }) => {
        try {
            let orders = await apiGetOrders({
                state,
                limit,
                skip,
            })

            return orders
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

export { fetchCreateNewOrder, fetchRefreshGetOrders, fetchLoadMoreGetOrders }
