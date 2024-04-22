import { createAsyncThunk } from '@reduxjs/toolkit'

import { apiGetCategories } from '../../api/categoryApi'

const fetchGetCategories = createAsyncThunk(
    'category/fetchCategories',
    async ({ limit }, { rejectWithValue }) => {
        try {
            let result = await apiGetCategories({ limit })

            return result
        } catch (error) {
            rejectWithValue(error.message)
        }
    },
)

export { fetchGetCategories }
