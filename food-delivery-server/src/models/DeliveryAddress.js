import mongoose, { Schema } from 'mongoose'

const deliveryAddressSchema = new Schema({
    idUser: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
    },
    deliveryAddress: {
        type: String,
        required: true,
    },
    recipientName: {
        type: String,
        required: true,
    },
    contactPhoneNumber: {
        type: String,
        required: true,
    },
    isDefault: {
        type: Boolean,
        required: true,
    },
})

const DeliveryAddressModel = mongoose.model(
    'DeliveryAddress',
    deliveryAddressSchema,
)

// deliveryAddressSchema.pre('save', async function (next) {
//     if (this.isDefault) {
//         try {
//             // Update all other documents to set isDefault to false
//             const filter = { _id: { $ne: this._id } } // Exclude current document
//             const update = { isDefault: false }
//             await DeliveryAddressModel.updateMany(filter, update)
//         } catch (error) {
//             return next(error)
//         }
//     }
//     next()
// })

export default DeliveryAddressModel
