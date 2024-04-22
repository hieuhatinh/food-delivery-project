import mongoose, { Schema } from 'mongoose'

const orderSchema = new Schema(
    {
        idUser: {
            type: Schema.Types.ObjectId,
            ref: 'Users',
        },
        recipientName: {
            type: String,
            require: true,
        },
        deliveryAddress: {
            type: String,
            require: true,
        },
        contactPhoneNumber: {
            type: String,
            require: true,
        },
        state: {
            type: String,
            require: true,
            enum: ['accepted', 'getting', 'delivering', 'delivered', 'cancel'],
            default: 'accepted',
        },
        payment: {
            type: String,
            require: true,
            default: 'Cash',
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
        meals: [
            {
                mealId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Meals',
                },
                artwork: {
                    type: String,
                    require: true,
                },
                foodName: {
                    type: String,
                    require: true,
                },
                price: {
                    type: Number,
                    require: true,
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
    },
    {
        timestamps: true,
    },
)

const OrderModel = mongoose.model('Orders', orderSchema)

export default OrderModel
