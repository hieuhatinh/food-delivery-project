import mongoose, { Schema } from 'mongoose'

const categoryResSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Categories',
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurants',
    },
})

const CategoryResModel = mongoose.model('CategoryRes', categoryResSchema)

export default CategoryResModel
