// import { createAsyncThunk } from '@reduxjs/toolkit'
// import { apiCreateDeliveryAddress } from '../../api/orderApi'

// const fetchCreateDeliveryAddress = createAsyncThunk(
//     'order/fetchCreateDeliveryAddress',
//     async (
//         { deliveryAddress, contactPhoneNumber, recipientName, isDefault },
//         { rejectWithValue },
//     ) => {
//         try {
//             let newAddress = await apiCreateDeliveryAddress({
//                 deliveryAddress,
//                 contactPhoneNumber,
//                 recipientName,
//                 isDefault,
//             })

//             return newAddress
//         } catch (error) {
//             return rejectWithValue(error.message)
//         }
//     },
// )

// export { fetchCreateDeliveryAddress }
