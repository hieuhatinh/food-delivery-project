import { createAsyncThunk } from '@reduxjs/toolkit'

import { apiGetOpenRes } from '../../api/restaurantApi'

const fetchRefreshOpenRes = createAsyncThunk(
    'restaurants/fetchRefreshOpenRes',
    async ({ limit, state }, { rejectWithValue }) => {
        try {
            let result = await apiGetOpenRes({ limit, state, skip: 0 })

            return result
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

const fetchLoadMoreOpenRes = createAsyncThunk(
    'restaurants/fetchLoadMoreOpenRes',
    async ({ limit, state, skip }, { rejectWithValue }) => {
        try {
            let result = await apiGetOpenRes({ limit, state, skip })

            return result
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

export { fetchRefreshOpenRes, fetchLoadMoreOpenRes }
