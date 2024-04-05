import mongoose, { Schema } from 'mongoose'

const mealCartSchema = new Schema(
    {
        mealId: {
            type: Schema.Types.ObjectId,
            ref: 'Meals',
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
        },
    },
    { _id: false },
)

const cartSchema = new Schema({
    meals: [mealCartSchema],
})

const CartModel = mongoose.model('Carts', cartSchema)

export default CartModel
