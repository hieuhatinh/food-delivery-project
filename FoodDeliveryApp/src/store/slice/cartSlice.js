import { createSlice } from '@reduxjs/toolkit'

import {
    fetchLoadMoreGetAllMealsInCart,
    fetchUpdateQuantity,
    fetchDeleteMeal,
    fetchCountQuantity,
    fetchAddToCart,
    fetchRefreshGetAllMealsInCart,
    fetchDeleteManyMeals,
} from '../actions/cartAction'
import { limit } from '../../utils/configLoadData'

const initialState = {
    mealsInCart: {
        meals: [],
        isCheckedAll: false,
    },
    isLoading: false,
    isSuccess: false,
    messageSuccess: null,
    error: {
        isError: false,
        message: null,
    },
    typeFetch: null,
    numberMeals: 0,
    isStopLoadMore: false,
    isPressChangeQuantity: false,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // xử lý thay đổi số lượng món ăn trong giỏ hàng
        setIsPressChangeQuantity: (state, action) => {
            state.isPressChangeQuantity = action.payload
        },
        setQuantityMeal: (state, action) => {
            let { _id, quantity, size } = action.payload
            let meal = state.mealsInCart.meals.find(
                (item) => item.mealId._id === _id && item.size === size,
            )
            meal.quantity = quantity
        },
        // xử lý chọn item
        setSelectAll: (state, action) => {
            state.mealsInCart.isCheckedAll = action.payload
            state.mealsInCart.meals = state.mealsInCart.meals.map((item) => ({
                ...item,
                isChecked: action.payload,
            }))
        },
        setSelectItem: (state, action) => {
            let { _id, isChecked, size, quantity } = action.payload
            let meal = state.mealsInCart.meals.find(
                (item) =>
                    item.mealId._id === _id &&
                    item.size === size &&
                    item.quantity === quantity,
            ) // tìm item
            meal.isChecked = isChecked
            state.mealsInCart.isCheckedAll =
                state.mealsInCart.meals.reduce((totalItemChecked, item) => {
                    return item.isChecked && ++totalItemChecked
                }, 0) === state.mealsInCart.meals.length
        },
        resetTypeFetch: (state, action) => {
            state.typeFetch = null
        },
        reStopLoadMore: (state, action) => {
            state.isStopLoadMore = false
            state.mealsInCart = {
                meals: [],
                isCheckedAll: false,
            }
        },
        reState: (state, action) => {
            state.error.isError = false
            state.error.message = null
            state.isSuccess = false
            state.messageSuccess = null
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRefreshGetAllMealsInCart.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(
                fetchRefreshGetAllMealsInCart.fulfilled,
                (state, action) => {
                    state.isSuccess = true
                    if (!!action.payload?.[0]) {
                        state.mealsInCart.meals = action.payload[0].meals.map(
                            (item) => ({
                                ...item,
                                isChecked: state.mealsInCart.isCheckedAll,
                            }),
                        )
                    }
                    state.isStopLoadMore =
                        action.payload.length === 0 ||
                        action.payload?.[0]?.meals.length < limit
                    state.isLoading = false
                },
            )
            .addCase(
                fetchRefreshGetAllMealsInCart.rejected,
                (state, action) => {
                    state.isLoading = false
                    state.error.isError = true
                    state.error.message = action.payload
                },
            )
        builder
            .addCase(
                fetchLoadMoreGetAllMealsInCart.pending,
                (state, action) => {
                    state.isLoading = true
                },
            )
            .addCase(
                fetchLoadMoreGetAllMealsInCart.fulfilled,
                (state, action) => {
                    state.isSuccess = true
                    if (!!action.payload?.[0]) {
                        let resultAddChecked = action.payload[0].meals.map(
                            (item) => ({
                                ...item,
                                isChecked: state.mealsInCart.isCheckedAll,
                            }),
                        )
                        state.mealsInCart.meals.push(...resultAddChecked)
                    }
                    state.isStopLoadMore =
                        action.payload.length === 0 ||
                        action.payload?.[0]?.meals.length < limit
                    state.isLoading = false
                },
            )
            .addCase(
                fetchLoadMoreGetAllMealsInCart.rejected,
                (state, action) => {
                    state.isLoading = false
                    state.error.isError = true
                    state.error.message = action.payload
                },
            )
        builder
            .addCase(fetchUpdateQuantity.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchUpdateQuantity.fulfilled, (state, action) => {
                state.isSuccess = true
                state.typeFetch = action.payload.typeFetch
                state.isLoading = false
            })
            .addCase(fetchUpdateQuantity.rejected, (state, action) => {
                state.error.isError = true
                state.error.message = action.payload
                state.isLoading = false
            })
        builder
            .addCase(fetchDeleteMeal.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchDeleteMeal.fulfilled, (state, action) => {
                state.isSuccess = true
                state.messageSuccess = action.payload.message
                state.typeFetch = action.payload.typeFetch
                state.isLoading = false
            })
            .addCase(fetchDeleteMeal.rejected, (state, action) => {
                state.error.isError = true
                state.error.message = action.payload
                state.isLoading = false
            })
        builder
            .addCase(fetchDeleteManyMeals.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchDeleteManyMeals.fulfilled, (state, action) => {
                state.isSuccess = true
                state.messageSuccess = action.payload.message
                state.typeFetch = action.payload.typeFetch
                state.isLoading = false
            })
            .addCase(fetchDeleteManyMeals.rejected, (state, action) => {
                state.error.isError = true
                state.error.message = action.payload
                state.isLoading = false
            })
        builder
            .addCase(fetchCountQuantity.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchCountQuantity.fulfilled, (state, action) => {
                state.isSuccess = true
                state.numberMeals = action.payload
                state.isLoading = false
            })
            .addCase(fetchCountQuantity.rejected, (state, action) => {
                state.error.isError = true
                state.error.message = action.payload
                state.isLoading = false
            })
        builder
            .addCase(fetchAddToCart.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchAddToCart.fulfilled, (state, action) => {
                state.isSuccess = true
                state.messageSuccess = action.payload.message
                state.typeFetch = action.payload.typeFetch
                state.isLoading = false
            })
            .addCase(fetchAddToCart.rejected, (state, action) => {
                state.error.isError = true
                state.error.message = action.payload
                state.isLoading = false
            })
    },
})

export const {
    setIsPressChangeQuantity,
    setQuantityMeal,
    setSelectAll,
    setSelectItem,
    resetTypeFetch,
    reStopLoadMore,
    reState,
} = cartSlice.actions

export default cartSlice.reducer
