import mongoose, { Schema } from 'mongoose'

const restautantSchema = new Schema({
    restaurantName: {
        type: String,
        require: true,
    },
    address: {
        type: String,
        require: true,
    },
    state: {
        type: String,
        enum: ['open', 'close'],
        require: true,
    },
})

const RestautantModel = mongoose.model('Restaurants', restautantSchema)

export default RestautantModel
