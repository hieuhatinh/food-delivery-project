import mongoose, { Schema } from 'mongoose'

const mealSchema = new Schema({
    foodName: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    artWork: {
        type: Schema.Types.ObjectId,
        ref: 'Image',
        require: false,
    },
    describe: {
        type: String,
        require: false,
    },
    size: {
        type: [String],
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
