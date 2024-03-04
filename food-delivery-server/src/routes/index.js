import userRouter from './user.js'

function routes(app) {
    app.use('/user', userRouter)
}

export default routes
