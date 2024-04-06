import { createAsyncThunk } from '@reduxjs/toolkit'

import axiosClient from '../../api/axiosClient'

const fetchGetCategories = createAsyncThunk(
    'category/fetchCategories',
    async ({ limit }, { rejectWithValue }) => {
        try {
            let categoriesResult = await axiosClient.get(
                '/category/get-categories',
                {
                    params: {
                        limit,
                    },
                },
            )

            return categoriesResult.data.categories
        } catch (error) {
            rejectWithValue(error.response.data.message)
        }
    },
)

export { fetchGetCategories }
