import axiosClient from './axiosClient'

const userApiLogin = async ({ email, password }) => {
    try {
        let user = await axiosClient.post('/user/login', {
            email,
            password,
        })

        return user.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const userApiRegister = async ({ email, password }) => {
    try {
        let newUser = await axiosClient.post('/user/register', {
            email,
            password,
        })

        return newUser.data.message
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const userApiUpdateInfo = async ({
    fullName,
    phoneNumber,
    address,
    sex,
    dateOfBirth,
    slogan,
}) => {
    try {
        let dateArr = dateOfBirth?.split('-')
        let dateStr = !!dateArr
            ? `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`
            : ''

        const userInfoUpdate = await axiosClient.patch(
            `/user/update-information`,
            {
                fullName: fullName?.trim(),
                phoneNumber: phoneNumber?.trim(),
                address: address?.trim(),
                sex: sex.value?.trim(),
                dateOfBirth: dateStr?.trim(),
                slogan: slogan?.trim(),
            },
        )

        return userInfoUpdate.data.message
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const userApiGetInfo = async () => {
    try {
        const userInfo = await axiosClient.get('/user/get-information')

        return userInfo.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export { userApiLogin, userApiRegister, userApiUpdateInfo, userApiGetInfo }
