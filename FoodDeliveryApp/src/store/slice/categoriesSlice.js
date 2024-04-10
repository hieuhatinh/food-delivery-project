import { createSlice } from '@reduxjs/toolkit'

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: [],
    reducers: {
        setCategoriesRedux(state, action) {
            return action.payload
        },
    },
})

export const { setCategoriesRedux } = categoriesSlice.actions

export default categoriesSlice.reducer
