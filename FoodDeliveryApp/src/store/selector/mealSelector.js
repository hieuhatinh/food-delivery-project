import { createSelector } from '@reduxjs/toolkit'

import formatCurrency from '../../utils/formatCurrency'

// meal
const selectMeal = (state) => state.meal

const selectSizesMeal = createSelector([selectMeal], (result) => {
    let sizes = result.mealInfo?.priceAndSize?.map((item) => item.size)

    return sizes
})

const selectSizeAndQuantity = createSelector([selectMeal], (result) => {
    return {
        ...result.sizeAndQuantity,
        price: formatCurrency(result.sizeAndQuantity?.price),
    }
})

export {
    selectMeal,
    selectSizesMeal,
    selectSizeAndQuantity,
}