import { OrderModel } from '../models/index.js'

const createNewOrder = async ({
    idUser,
    state,
    payment,
    deliveryAddress,
    note,
    contactPhoneNumber,
    meals,
}) => {
    let newOrder = await OrderModel.create({
        idUser,
        state,
        payment,
        deliveryAddress,
        note,
        contactPhoneNumber,
        meals,
    })

    let orderPopulateMeals = await OrderModel.findById(newOrder._id).populate(
        'meals.mealId',
        'priceAndSize',
    )

    let totalPayment = orderPopulateMeals.meals.reduce((total, item) => {
        let resultFindPrice = item.mealId.priceAndSize.find(
            (value) => value.size === item.size,
        )

        return total + resultFindPrice.price * item.quantity
    }, 0)

    newOrder.totalPayment = totalPayment
    await newOrder.save()

    return newOrder._doc
}

export default { createNewOrder }
