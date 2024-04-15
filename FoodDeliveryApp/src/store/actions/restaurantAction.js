import { createAsyncThunk } from '@reduxjs/toolkit'

import axiosClient from '../../api/axiosClient'

const fetchOpenRes = createAsyncThunk(
    'restaurants/fetchOpenRes',
    async ({ limit, state }, { rejectWithValue }) => {
        try {
            let openRes = await axiosClient.get('/restaurant/get-restaurants', {
                params: {
                    state,
                    limit,
                },
            })

            return openRes.data.restaurants
        } catch (error) {
            rejectWithValue(error.response.data.message)
        }
    },
)

export { fetchOpenRes }
