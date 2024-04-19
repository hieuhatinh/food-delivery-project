import { createAsyncThunk } from '@reduxjs/toolkit'

import { apiGetDetailRes } from '../../api/restaurantApi'

const fetchDetailRestaurant = createAsyncThunk(
    'restaurantInfo/fetchDetailRestaurant',
    async ({ idRestaurant }, { rejectWithValue }) => {
        try {
            let result = await apiGetDetailRes({ idRestaurant })

            return result
        } catch (error) {
            rejectWithValue(error.response.data.message)
        }
    },
)

export { fetchDetailRestaurant }
