import { createSelector } from '@reduxjs/toolkit'

// restaurants
const selectRestaurants = (state) => state.restaurants

// restaurantInfo
const selectRestaurantInfo = (state) => state.restaurantInfo

const selectCategoriesInRes = createSelector(
    [selectRestaurantInfo],
    (result) => {
        let categories = result.restaurantInfo?.categories?.map(
            (item) => item.categoryName,
        )

        return categories?.sort()
    },
)

const selectInfoCategoryInRes = createSelector(
    [selectRestaurantInfo],
    (result) => {
        return result.categorySelect
    },
)

export {
    selectRestaurants,
    selectRestaurantInfo,
    selectCategoriesInRes,
    selectInfoCategoryInRes,
}
