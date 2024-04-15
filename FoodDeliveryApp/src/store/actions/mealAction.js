import { createAsyncThunk } from '@reduxjs/toolkit'

import axiosClient from '../../api/axiosClient'

const fetchMealDetail = createAsyncThunk(
    'meal/fetchMealDetail',
    async ({ idMeal }, { rejectWithValue }) => {
        try {
            let mealInfo = await axiosClient.get(`/meal/${idMeal}/detail`)

            return mealInfo.data.mealInfo
        } catch (error) {
            rejectWithValue(error.response.data.message)
        }
    },
)

export { fetchMealDetail }
