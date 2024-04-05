import { userResponsitories } from '../responsitories/index.js'

const register = async (req, res) => {
    const { email, password } = req.body

    try {
        const newUser = await userResponsitories.register({
            email: email.trim(),
            password: password.trim(),
        })

        return res.status(200).json({
            ...newUser,
        })
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await userResponsitories.login({
            email: email.trim(),
            password: password.trim(),
        })

        return res.status(200).json({
            ...user,
        })
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        })
    }
}

const updateInfo = async (req, res) => {
    const { id } = req.user
    const { fullName, address, sex, slogan, phoneNumber, dateOfBirth } =
        req.body

    try {
        const user = await userResponsitories.updateInfo({
            id,
            fullName: fullName?.trim(),
            phoneNumber: phoneNumber?.trim(),
            address: address?.trim(),
            sex: sex?.trim(),
            dateOfBirth: dateOfBirth?.trim(),
            slogan: slogan?.trim(),
        })

        return res.status(200).json({
            ...user,
            message: 'Cập nhật thông tin thành công',
        })
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        })
    }
}

const getUserInfo = async (req, res) => {
    const { id } = req.user

    try {
        const user = await userResponsitories.getUserInfo({ id })

        return res.status(200).json({
            ...user,
            message: 'Lấy thông tin thành công',
        })
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        })
    }
}

export default {
    register,
    login,
    updateInfo,
    getUserInfo,
}
