import { configureStore } from '@reduxjs/toolkit'

import userReducer from './slice/userSlice'
import restaurantsReducer from './slice/restaurantSlice'

export default configureStore({
    reducer: {
        user: userReducer,
        restaurants: restaurantsReducer,
    },
})
