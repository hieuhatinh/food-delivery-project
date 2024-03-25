import mongoose, { Schema } from 'mongoose'

const cartMealSchema = new Schema({
    cartId: {
        type: Schema.Types.ObjectId,
        ref: 'Carts',
    },
    mealId: {
        type: Schema.Types.ObjectId,
        ref: 'Meals',
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
})

const CartMealModel = mongoose.model('CartMeal', cartMealSchema)

export default CartMealModel
