import { createAsyncThunk } from '@reduxjs/toolkit'

import axiosClient from '../../api/axiosClient'

const fetchLogin = createAsyncThunk(
    'user/fetchLogin',
    async ({ email, password }, {rejectWithValue}) => {
        try {
            let user = await axiosClient.post('/user/login', {
                email,
                password,
            })

            return {...user}
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }
    },
)

const fetchRegister = createAsyncThunk(
    'user/fetchRegister',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            let user = await axiosClient.post('/user/register', {
                email,
                password,
            })

            return { ...user }
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }
    },
)

export { fetchLogin, fetchRegister }
