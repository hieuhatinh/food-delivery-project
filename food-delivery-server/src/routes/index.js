import categoryRouter from './category.js'
import mealRouter from './meal.js'
import restaurantRouter from './restaurant.js'
import userRouter from './user.js'
import searchRouter from './search.js'
import cartRouter from './cart.js'
import orderRouter from './order.js'
import deliveryAddressRouter from './deliveryAddress.js'

function routes(app) {
    app.use('/user', userRouter)
    app.use('/category', categoryRouter)
    app.use('/restaurant', restaurantRouter)
    app.use('/meal', mealRouter)
    app.use('/search', searchRouter)
    app.use('/cart', cartRouter)
    app.use('/order', orderRouter)
    app.use('/delivery-address', deliveryAddressRouter)
}

export default routes
