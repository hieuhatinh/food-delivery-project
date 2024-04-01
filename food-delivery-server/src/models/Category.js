import mongoose, { Schema } from 'mongoose'

const categorySchema = new Schema({
    categoryName: {
        type: String,
        require: true,
    },
    image: {
        type: Schema.Types.ObjectId,
        ref: 'Image',
    },
    restaurants: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Restaurants',
        },
    ],
})

const CategoryModel = mongoose.model('Categories', categorySchema)

export default CategoryModel
