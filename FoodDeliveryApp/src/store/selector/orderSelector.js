import { createSelector } from '@reduxjs/toolkit'

const selectOrder = (state) => state.order

const selectMeals = createSelector([selectOrder], (result) =>
    result.mealsOrder.map((item) => ({
        ...item,
        price: item.price.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }),
    })),
)

export { selectOrder, selectMeals }
