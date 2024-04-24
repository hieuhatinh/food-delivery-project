import ErrorHandler from '../Exception/ErrorHandler.js'
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

const getOrders = async ({ idUser, state }) => {
    let orders
    if (state === 'ongoing') {
        orders = await OrderModel.find({
            $and: [
                {
                    idUser,
                },
                {
                    state: { $in: ['accepted', 'getting', 'delivering'] },
                },
            ],
        })
    } else if (state === 'history') {
        orders = await OrderModel.find({
            $and: [
                {
                    idUser,
                },
                {
                    state: { $in: ['completed', 'canceled'] },
                },
            ],
        })
    } else {
        throw new ErrorHandler('Invalid state parameter', 400)
    }

    return orders
}

export default { createNewOrder, getOrders }
