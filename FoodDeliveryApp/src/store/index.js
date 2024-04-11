import { configureStore } from '@reduxjs/toolkit'

import userReducer from './slice/userSlice'
import restaurantsReducer from './slice/restaurantSlice'
import categoriesReducer from './slice/categoriesSlice'
import searchReducer from './slice/searchSlice'
import cartReducer from './slice/cartSlice'

export default configureStore({
    reducer: {
        user: userReducer,
        restaurants: restaurantsReducer,
        categories: categoriesReducer,
        search: searchReducer,
        cart: cartReducer
    },
})
