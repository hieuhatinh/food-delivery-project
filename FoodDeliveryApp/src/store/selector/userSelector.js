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

export {
    selectUser,
    selectUserInfo,
    selectIdCart,
}