import { createAsyncThunk } from '@reduxjs/toolkit'

import axiosClient from '../../api/axiosClient'

const fetchDetailRestaurant = createAsyncThunk(
    'restaurantInfo/fetchDetailRestaurant',
    async ({ idRestaurant }, { rejectWithValue }) => {
        try {
            let res = await axiosClient.get(
                `/restaurant/${idRestaurant}/get-info`,
            )

            return res.data.restaurantInfo
        } catch (error) {
            rejectWithValue(error.response.data.message)
        }
    },
)

export { fetchDetailRestaurant }
