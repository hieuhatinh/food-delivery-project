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
        default: 0,
    },
    note: {
        type: String,
        require: false,
    },
    idUser: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
    },
    contactPhoneNumber: {
        type: String,
        require: true,
    },
    meals: [
        {
            mealId: {
                type: Schema.Types.ObjectId,
                ref: 'Meals',
            },
            size: {
                type: String,
                require: false,
            },
            quantity: {
                type: Number,
                require: true,
                default: 1,
            },
            _id: false,
        },
    ],
})

const OrderModel = mongoose.model('Orders', orderSchema)

export default OrderModel
