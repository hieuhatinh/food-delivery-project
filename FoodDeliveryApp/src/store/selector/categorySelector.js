import { createSelector } from '@reduxjs/toolkit'

// categories
const selectCategories = (state) => state.categories

const selectLimitCategories = createSelector([selectCategories], (result) => {
    return {
        categories: result.categories.slice(0, 5),
        isLoading: result.isLoading,
        isError: result.isError,
        isSuccess: result.isSuccess,
    }
})

const selectCategoriesName = createSelector(
    [selectCategories],
    (categories) => {
        return categories.categories.map((item) => ({
            _id: item._id,
            categoryName: item.categoryName,
        }))
    },
)

export { selectCategories, selectCategoriesName, selectLimitCategories }
