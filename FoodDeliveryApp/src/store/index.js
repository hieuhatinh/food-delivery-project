import { configureStore } from '@reduxjs/toolkit'

import userReducer from './slice/userSlice'
import restaurantsReducer from './slice/restaurantsSlice'
import categoriesReducer from './slice/categoriesSlice'
import searchReducer from './slice/searchSlice'
import cartReducer from './slice/cartSlice'
import restaurantInfoReducer from './slice/restaurantInfoSlice'
import mealReducer from './slice/mealSlice'
import orderReducer from './slice/orderSlice'
import deliveryAddressReducer from './slice/deliveryAddressSlice'

export default configureStore({
    reducer: {
        user: userReducer,
        restaurants: restaurantsReducer,
        restaurantInfo: restaurantInfoReducer,
        categories: categoriesReducer,
        search: searchReducer,
        cart: cartReducer, 
        meal: mealReducer, 
        order: orderReducer, 
        deliveryAddress: deliveryAddressReducer
    },
})
