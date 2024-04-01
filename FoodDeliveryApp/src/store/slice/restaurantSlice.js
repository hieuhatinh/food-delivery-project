import { createSlice } from '@reduxjs/toolkit'

export const restaurantsSlice = createSlice({
    name: 'restaurants',
    initialState: [],
    reducers: {
        setRestaurants(state, action) {
            return action.payload
        },
    },
})

export const { setRestaurants } = restaurantsSlice.actions

export default restaurantsSlice.reducer
