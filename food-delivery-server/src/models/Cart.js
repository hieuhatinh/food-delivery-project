import mongoose, { Schema } from 'mongoose'

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
    },
})

const CartModel = mongoose.model('Carts', cartSchema)

export default CartModel
