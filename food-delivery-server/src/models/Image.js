import mongoose, { Schema } from 'mongoose'

const imageSchema = new Schema({
    fileName: {
        type: String,
        require: true,
    },
    file: {
        data: Buffer,
        contentType: String,
    },
    uploadTime: {
        type: Date,
        default: Date.now,
    },
})

const ImageModel = mongoose.model('Image', imageSchema)

export default ImageModel
