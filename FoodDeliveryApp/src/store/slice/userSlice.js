import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: null,
        fullName: null,
        slogan: null,
        email: null,
    },
    reducers: {
        setUserInfo: (state, action) => {
            state.id = action.payload.id
            state.fullName = action.payload.fullName
            state.slogan = action.payload.slogan
            state.email = action.payload.email
        },
    },
})

export const { setUserInfo } = userSlice.actions

export default userSlice.reducer
