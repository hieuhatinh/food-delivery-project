import { createSlice } from '@reduxjs/toolkit'

import * as storage from '../../storage'
import { KEY_USER } from '../../storage/keys'

import { fetchGetUserInfo, fetchLogin, fetchRegister, fetchUpdateInfomation } from '../actions/userAction'

const initialState = {
    userInfo: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
    messageNotify: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveToken: (state, action) => {
            storage.setItem(KEY_USER, action.payload)
        },
        logout: (state, action) => {
            storage.deleteItem(KEY_USER)
            state.isError = false,
            state.isLoading = false
            state.isSuccess = false
            state.userInfo =  {}
        },
        reState: (state, action) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.messageNotify = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogin.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.userInfo = action.payload.userInfo
                state.messageNotify = action.payload.message
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(fetchLogin.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.messageNotify = action.payload
            })
        builder 
            .addCase(fetchRegister.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                state.messageNotify = action.payload
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(fetchRegister.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.messageNotify = action.payload
            })
        builder
            .addCase(fetchUpdateInfomation.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchUpdateInfomation.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.messageNotify = action.payload
            })
            .addCase(fetchUpdateInfomation.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.messageNotify = action.payload
            })
        builder
            .addCase(fetchGetUserInfo.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchGetUserInfo.fulfilled, (state, action) => {
                state.isSuccess = true
                state.messageNotify = action.payload.message
                state.userInfo = action.payload.userInfo
                state.isLoading = false
            })
            .addCase(fetchGetUserInfo.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.messageNotify = action.payload.message
            })
    },
})

export const { saveToken, logout, reState } = userSlice.actions

export default userSlice.reducer
