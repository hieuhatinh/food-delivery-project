import { createAsyncThunk } from '@reduxjs/toolkit'

import {
    userApiGetInfo,
    userApiLogin,
    userApiRegister,
    userApiUpdateInfo,
} from '../../api/userApi'

const fetchLogin = createAsyncThunk(
    'user/fetchLogin',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            let result = await userApiLogin({ email, password })

            return result
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

const fetchRegister = createAsyncThunk(
    'user/fetchRegister',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            let result = await userApiRegister({ email, password })

            return result
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

const fetchUpdateInfomation = createAsyncThunk(
    'user/fetchUpdateInfomation',
    async (
        { fullName, phoneNumber, address, sex, dateOfBirth, slogan },
        { rejectWithValue },
    ) => {
        try {
            let result = await userApiUpdateInfo({
                fullName,
                phoneNumber,
                address,
                sex,
                dateOfBirth,
                slogan,
            })

            return result
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

const fetchGetUserInfomation = createAsyncThunk(
    'user/fetchGetUserInfomation',
    async ({}, { rejectWithValue }) => {
        try {
            let result = await userApiGetInfo()

            return result
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

export {
    fetchLogin,
    fetchRegister,
    fetchUpdateInfomation,
    fetchGetUserInfomation,
}
