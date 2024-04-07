import { createAsyncThunk } from '@reduxjs/toolkit'

import axiosClient from '../../api/axiosClient'

const fetchLogin = createAsyncThunk(
    'user/fetchLogin',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            let user = await axiosClient.post('/user/login', {
                email,
                password,
            })

            return user.data
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

            return user.data.message
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }
    },
)

const fetchUpdateInfomation = createAsyncThunk(
    'user/fetchUpdateInfomation',
    async (
        { idUser, fullName, phoneNumber, address, sex, dateOfBirth, slogan },
        { rejectWithValue },
    ) => {
        try {
            let dateArr = dateOfBirth?.split('-')
            let dateStr = !!dateArr
                ? `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`
                : ''

            const userInfoUpdate = await axiosClient.patch(
                `/user/${idUser}/update-information`,
                {
                    fullName: fullName?.trim(),
                    phoneNumber: phoneNumber?.trim(),
                    address: address?.trim(),
                    sex: sex.value?.trim(),
                    dateOfBirth: dateStr?.trim(),
                    slogan: slogan?.trim(),
                },
            )

            return userInfoUpdate.data.message
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }
    },
)

const fetchGetUserInfo = createAsyncThunk(
    'user/fetchGetUserInfo', 
    async ({idUser}, {rejectWithValue}) => {
        try {
            const user = await axiosClient.get(
                `/user/${idUser}/get-information`,
            )

            return user.data
        } catch (error) {
            rejectWithValue(error.response.data.message)
        }
    }
)

export { fetchLogin, fetchRegister, fetchUpdateInfomation, fetchGetUserInfo }
