import { createAsyncThunk } from '@reduxjs/toolkit'

import { apiGetDetailMeal } from '../../api/mealApi'

const fetchMealDetail = createAsyncThunk(
    'meal/fetchMealDetail',
    async ({ idMeal }, { rejectWithValue }) => {
        try {
            let result = await apiGetDetailMeal({ idMeal })

            return result
        } catch (error) {
            rejectWithValue(error.message)
        }
    },
)

export { fetchMealDetail }
