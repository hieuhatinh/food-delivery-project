import { createAsyncThunk } from '@reduxjs/toolkit'

import { apiGetOpenRes } from '../../api/restaurantApi'

const fetchOpenRes = createAsyncThunk(
    'restaurants/fetchOpenRes',
    async ({ limit, state }, { rejectWithValue }) => {
        try {
            let result = await apiGetOpenRes({ limit, state })

            return result
        } catch (error) {
            rejectWithValue(error.response.data.message)
        }
    },
)

export { fetchOpenRes }
