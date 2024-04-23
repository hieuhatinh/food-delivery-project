import { createAsyncThunk } from '@reduxjs/toolkit'

import { apiGetDetailRes } from '../../api/restaurantApi'

const fetchDetailRestaurant = createAsyncThunk(
    'restaurantInfo/fetchDetailRestaurant',
    async ({ idRestaurant }, { rejectWithValue }) => {
        try {
            let result = await apiGetDetailRes({ idRestaurant })

            return result
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

export { fetchDetailRestaurant }
