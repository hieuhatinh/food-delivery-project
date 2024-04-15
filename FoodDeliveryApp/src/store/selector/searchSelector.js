import { createSelector } from '@reduxjs/toolkit'

// search
const selectSearch = (state) => state.search

const selectLimitSearch = createSelector([selectSearch], (result) => {
    return result.meals.slice(0, 4)
})

export { selectSearch, selectLimitSearch }
