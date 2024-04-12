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

const selectIdCart = createSelector([selectUser], (result) => {
    return result.userInfo.cartId
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

export {
    selectUser,
    selectUserInfo,
    selectIdCart,
    selectCategories,
    selectCategoriesName,
    selectLimitCategories,
    selectRestaurants,
    selectSearch,
    selectLimitSearch,
    selectCart,
    selectorTotalPrice,
    selectTypeFetch,
    selectNumberMeals,
}
