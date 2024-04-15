import { createSelector } from '@reduxjs/toolkit'

// meal
const selectMeal = (state) => state.meal

const selectSizesMeal = createSelector([selectMeal], (result) => {
    let sizes = result.mealInfo?.priceAndSize?.map((item) => item.size)

    return sizes
})

const selectSizeAndQuantity = createSelector([selectMeal], (result) => {
    return {
        ...result.sizeAndQuantity,
        price: result.sizeAndQuantity?.price?.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }),
    }
})

export {
    selectMeal,
    selectSizesMeal,
    selectSizeAndQuantity,
}