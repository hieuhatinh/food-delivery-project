import mongoose, { Schema } from 'mongoose'

const restautantSchema = new Schema({
    restaurantName: {
        type: String,
        require: true,
    },
    image: {
        fileName: {
            type: String,
            require: true,
        },
        path: String,
        mimetype: String,
        uploadTime: {
            type: Date,
            default: Date.now,
        },
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
    rate: {
        type: Number,
        require: false,
    },
    introduce: {
        type: String,
        require: false,
    },
    categories: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Categories',
        },
    ],
})

const RestautantModel = mongoose.model('Restaurants', restautantSchema)

export default RestautantModel
