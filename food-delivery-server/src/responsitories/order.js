import { OrderModel } from '../models/index.js'

const createNewOrder = async ({
    idUser,
    state,
    payment,
    deliveryAddress,
    note,
    contactPhoneNumber,
    recipientName,
    meals,
}) => {
    let newOrder = await OrderModel.create({
        idUser,
        state,
        payment,
        deliveryAddress,
        note,
        contactPhoneNumber,
        recipientName,
        meals,
    })

    let totalPayment = meals.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
    )

    newOrder.totalPayment = totalPayment
    await newOrder.save()

    return newOrder._doc
}

const getAllOrder = async ({ idUser, state }) => {
    let orders = await OrderModel.find({
        $and: [
            {
                idUser,
            },
            {
                state,
            },
        ],
    })

    return orders
}

export default { createNewOrder, getAllOrder }
