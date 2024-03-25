import mongoose, { Schema } from 'mongoose'

const orderSchema = new Schema({
    state: {
        type: String,
        require: true,
        enum: ['Accepted', 'Getting', 'Delivering', 'Delivered', 'Cancel'],
        default: 'Accepted',
    },
    payment: {
        type: String,
        require: true,
        default: 'Cash',
    },
    deliveryAddress: {
        type: String,
        require: true,
    },
    totalPayment: {
        type: Number,
        require: true,
    },
    note: {
        type: String,
        require: false,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
    },
    contactPhoneNumber: {
        type: String,
        require: true,
    },
})

const OrderModel = mongoose.model('Orders', orderSchema)

export default OrderModel
