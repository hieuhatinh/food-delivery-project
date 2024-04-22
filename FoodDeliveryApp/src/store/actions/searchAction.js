import { createAsyncThunk } from '@reduxjs/toolkit'

import { apiSearchByCategory, apiSearchByName } from '../../api/searchApi'

const fetchSearchByName = createAsyncThunk(
    'search/fetchSearchByName',
    async ({ searchValue }, { rejectWithValue }) => {
        try {
            let result = await apiSearchByName({ searchValue })

            return result
        } catch (error) {
            rejectWithValue(error.message)
        }
    },
)

const fetchSearchByCategory = createAsyncThunk(
    'search/fetchSearchByCategory',
    async ({ idCategory }, { rejectWithValue }) => {
        try {
            let result = await apiSearchByCategory({ idCategory })

            return result
        } catch (error) {
            rejectWithValue(error.message)
        }
    },
)

export { fetchSearchByName, fetchSearchByCategory }
