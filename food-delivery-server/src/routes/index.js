import categoryRouter from './category.js'
import mealRouter from './meal.js'
import restaurantRouter from './restaurant.js'
import userRouter from './user.js'

function routes(app) {
    app.use('/user', userRouter)
    app.use('/category', categoryRouter)
    app.use('/restaurant', restaurantRouter)
    app.use('/meal', mealRouter)
}

export default routes
