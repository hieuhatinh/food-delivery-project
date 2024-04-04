import { configureStore } from '@reduxjs/toolkit'

import userReducer from './slice/userSlice'
import restaurantsReducer from './slice/restaurantSlice'
import categoriesReducer from './slice/categoriesSlice'

export default configureStore({
    reducer: {
        user: userReducer,
        restaurants: restaurantsReducer,
        categories: categoriesReducer,
    },
})
