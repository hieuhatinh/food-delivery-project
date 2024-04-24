import { createSelector } from '@reduxjs/toolkit'

import formatCurrency from '../../utils/formatCurrency'

const selectOrder = (state) => state.order

const selectMeals = createSelector([selectOrder], (result) =>
    result.mealsOrder.map((item) => ({
        ...item,
        price: formatCurrency(item.price),
    })),
)

export { selectOrder, selectMeals }
