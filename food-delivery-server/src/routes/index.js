import categoryRouter from './category.js'
import mealRouter from './meal.js'
import restaurantRouter from './restaurant.js'
import userRouter from './user.js'
import searchRouter from './search.js'
import cartRouter from './cart.js'

function routes(app) {
    app.use('/user', userRouter)
    app.use('/category', categoryRouter)
    app.use('/restaurant', restaurantRouter)
    app.use('/meal', mealRouter)
    app.use('/search', searchRouter)
    app.use('/cart', cartRouter)
}

export default routes
