import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import * as dotenv from 'dotenv'

import routes from './src/routes/index.js'
import connectDB from './src/database/index.js'

// nhập dữ liệu vào restaurant, meal, category database
// thêm vào giỏ hàng
// tạo giỏ hàng ngay khi tạo tài khoản người dùng
// lấy thông tin giỏ hàng

dotenv.config()

const app = express()
const port = 3000

/**
 *  App Configuration
 */
app.use(morgan('combined'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// connect database
connectDB()

// routes
routes(app)

// server activation
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
