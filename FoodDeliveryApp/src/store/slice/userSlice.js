import { createSlice } from '@reduxjs/toolkit'

import * as storage from '../../storage'
import { KEY_USER } from '../../storage/keys'

import { fetchLogin, fetchRegister } from '../actions/userAction'

const initialState = {
        userInfo: {},
        errorMessage: null,
        isLoading: false,
        isSuccess: false,
        isError: false,
    }

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.id = action.payload.id
            state.fullName = action.payload.fullName
            state.slogan = action.payload.slogan
            state.email = action.payload.email
        },
        saveToken: (state, action) => {
            storage.setItem(KEY_USER, action.payload)
        },
        logout: (state, action) => {
            storage.deleteItem(KEY_USER)
            initialState
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogin.pending, (state, action) => {
                state.isLoading = true
                state.isSuccess = false
                state.isError = false
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.userInfo = action.payload
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
            })
            .addCase(fetchLogin.rejected, (state, action) => {
                state.errorMessage = action.payload
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
            })
        builder
            .addCase(fetchRegister.pending, (state, action) => {
                state.isLoading = true
                state.isSuccess = false
                state.isError = false
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                state.userInfo = action.payload
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
            })
            .addCase(fetchRegister.rejected, (state, action) => {
                state.errorMessage = action.payload
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
            })
    },
})

export const { setUserInfo, saveToken, logout } = userSlice.actions

export default userSlice.reducer
