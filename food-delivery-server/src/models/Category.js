import mongoose, { Schema } from 'mongoose'

const categorySchema = new Schema({
    categoryName: {
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
    restaurants: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Restaurants',
        },
    ],
})

const CategoryModel = mongoose.model('Categories', categorySchema)

export default CategoryModel
