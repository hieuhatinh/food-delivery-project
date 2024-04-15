import { createSelector } from '@reduxjs/toolkit'

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

    return total?.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
    })
})

const selectTypeFetch = createSelector(
    [selectCart],
    (result) => result.typeFetch,
)

const selectNumberMeals = createSelector(
    [selectCart],
    (result) => result.numberMeals,
)

export { selectCart, selectorTotalPrice, selectTypeFetch, selectNumberMeals }
