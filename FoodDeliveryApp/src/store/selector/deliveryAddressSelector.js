import { createSelector } from '@reduxjs/toolkit'

const selectDeliveryAddress = (state) => state.deliveryAddress

const selectIdAddress = createSelector(
    [selectDeliveryAddress],
    (result) => result.selectedIdAddress,
)

const selectAddressDeliveryCurrent = createSelector(
    [selectDeliveryAddress],
    (result) => result.addressDeliveryCurrent,
)

export { selectDeliveryAddress, selectIdAddress, selectAddressDeliveryCurrent }
