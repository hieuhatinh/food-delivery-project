import { createAsyncThunk } from '@reduxjs/toolkit'

import { apiGetCategories, apiGetCategoriesName } from '../../api/categoryApi'

const fetchRefreshGetCategories = createAsyncThunk(
    'category/fetchRefreshGetCategories',
    async ({ limit }, { rejectWithValue }) => {
        try {
            let result = await apiGetCategories({ limit, skip: 0 })

            return result
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

const fetchLoadMoreGetCategories = createAsyncThunk(
    'category/fetchLoadMoreGetCategories',
    async ({ limit, skip }, { rejectWithValue }) => {
        try {
            let result = await apiGetCategories({ limit, skip })

            return result
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

const fetchGetCategoriesName = createAsyncThunk(
    'category/fetchGetCategoriesName',
    async (_, { rejectWithValue }) => {
        try {
            let result = await apiGetCategoriesName()

            return result
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

export {
    fetchRefreshGetCategories,
    fetchGetCategoriesName,
    fetchLoadMoreGetCategories,
}
