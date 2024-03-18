import mongoose from 'mongoose'
import * as dotenv from 'dotenv'

dotenv.config()

async function connectDB() {
    try {
        let connection = await mongoose.connect(process.env.MONGODB_ATLAS_URI, {
            dbName: 'FoodDelivery',
        })

        console.log('Connect database successfully')
        return connection
    } catch (err) {
        console.log(err)
        throw new Error('Connect database failure')
    }
}

export default connectDB
