import mongoose, { Schema } from 'mongoose'

const categorySchema = new Schema({
    categoryName: {
        type: String,
        require: true,
    },
})

const CategoryModel = mongoose.model('Categories', categorySchema)

export default CategoryModel
