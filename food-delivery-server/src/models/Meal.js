import mongoose, { Schema } from 'mongoose'

const mealSchema = new Schema({
    foodName: {
        type: String,
        require: true,
    },
    priceAndSize: [
        {
            price: {
                type: Number,
                require: true,
            },
            size: {
                type: String,
                require: false,
            },
            _id: false,
        },
    ],
    artwork: {
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
    describe: {
        type: String,
        require: false,
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurants',
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Categories',
    },
})

const MealModel = mongoose.model('Meals', mealSchema)

export default MealModel
