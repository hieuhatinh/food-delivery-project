import { createSelector } from '@reduxjs/toolkit'
import { itemsSex } from '../../screens/PersonalInfo/itemSex'

// user
const selectUser = (state) => state.user

const selectUserInfo = createSelector([selectUser], (result) => {
    let dateTimeArr = result.userInfo.dateOfBirth?.substring(0, 10).split('-')

    let dateString =
        !!dateTimeArr && `${dateTimeArr[2]}-${dateTimeArr[1]}-${dateTimeArr[0]}`

    let sex =
        result.userInfo.sex &&
        itemsSex.find((item) => item.value === result.userInfo.sex)

    return {
        ...result.userInfo,
        dateOfBirth: dateString,
        sex,
    }
})

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

// restaurant
const selectRestaurants = (state) => state.restaurants

// search
const selectSearch = (state) => state.search

const selectLimitSearch = createSelector([selectSearch], (result) => {
    return result.meals.slice(0, 4)
})

export {
    selectUser,
    selectUserInfo,
    selectCategories,
    selectCategoriesName,
    selectLimitCategories,
    selectRestaurants,
    selectSearch,
    selectLimitSearch,
}
