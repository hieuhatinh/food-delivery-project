import { createSelector } from '@reduxjs/toolkit'

import formatCurrency from '../../utils/formatCurrency'

// cart
const selectCart = (state) => state.cart

const selectorTotalPrice = createSelector([selectCart], (result) => {
    let total = result.mealsInCart.meals.reduce((sum, item) => {
        if (item.isChecked) {
            let price = item.mealId.priceAndSize.find(
                (priceSize) => priceSize.size === item.size,
            ).price
            return sum + price * item.quantity
        }

        return sum
    }, 0)

    return formatCurrency(total)
})

const selectTypeFetch = createSelector(
    [selectCart],
    (result) => result.typeFetch,
)

const selectNumberMeals = createSelector(
    [selectCart],
    (result) => result.numberMeals,
)

const selectMealsChecked = createSelector([selectCart], (result) => {
    let mealsChecked = []

    result.mealsInCart.meals.forEach((item) => {
        if (item.isChecked) {
            let price = item.mealId.priceAndSize.find(
                (p) => p.size === item.size,
            ).price

            mealsChecked.push({
                mealId: item.mealId._id,
                artwork: item.mealId.artwork.path,
                foodName: item.mealId.foodName,
                size: item.size,
                quantity: item.quantity,
                price,
            })
        }
    })

    return mealsChecked
})

const selectIsPressChangeQuantiy = createSelector([selectCart], (result) => {
    return result.isPressChangeQuantity
})

export {
    selectCart,
    selectorTotalPrice,
    selectTypeFetch,
    selectNumberMeals,
    selectMealsChecked,
    selectIsPressChangeQuantiy,
}
