import { createAsyncThunk } from '@reduxjs/toolkit'

import axiosClient from '../../api/axiosClient'

const fetchSearchByName = createAsyncThunk(
    'search/fetchSearchByName',
    async ({ searchValue }, { rejectWithValue }) => {
        try {
            let resultSearch = await axiosClient.get(`/search/meal`, {
                params: {
                    searchValue,
                },
            })

            return resultSearch.data.meals
        } catch (error) {
            rejectWithValue(error.response.data.message)
        }
    },
)

const fetchSearchByCategory = createAsyncThunk(
    'search/fetchSearchByCategory',
    async ({ idCategory }, { rejectWithValue }) => {
        try {
            let resultSearch = await axiosClient.get(
                `/search/category/${idCategory}`,
            )

            return resultSearch.data.meals
        } catch (error) {
            rejectWithValue(error.response.data.message)
        }
    },
)

export { fetchSearchByName, fetchSearchByCategory }
