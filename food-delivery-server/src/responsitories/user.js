import { UserModel } from '../models/index.js'
import jwt from 'jsonwebtoken'

const register = async ({ email, password }) => {
    const existedUser = await UserModel.findOne({
        email,
    })

    if (existedUser) {
        throw new Error('Người dùng đã tồn tại trong hệ thống.')
    }

    const newUser = await UserModel.create({
        email,
        password,
    })

    return {
        message: 'Đăng ký thành công.',
        userInfo: { ...newUser._doc, password: 'Not show' },
    }
}

const login = async ({ email, password }) => {
    const user = await UserModel.findOne({
        email,
    })

    if (!user) {
        throw new Error('Tài khoản hoặc mật khẩu sai.')
    }

    const isMatchedPassword = await user.comparePassword(password)

    if (!isMatchedPassword) {
        throw new Error('Tài khoản hoặc mật khẩu sai.')
    }

    const token = await jwt.sign(
        { id: user._id, email },
        process.env.PRIVATE_KEY,
    )

    return {
        message: 'Đăng nhập thành công',
        token,
        userInfo: { ...user._doc, password: 'Not show' },
    }
}

const updateInfo = async ({
    id,
    fullName,
    phoneNumber,
    address,
    sex,
    dateOfBirth,
    slogan,
}) => {
    // Kiểm tra xem dateOfBirth có đúng định dạng không
    if (dateOfBirth) {
        const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth)
        if (!isValidDate) {
            throw new Error('Ngày sinh không đúng định dạng yyyy-mm-dd')
        }
    }

    // Kiểm tra xem phoneNumber có đúng định dạng không
    if (phoneNumber) {
        const isValidPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(
            phoneNumber,
        )

        if (!isValidPhoneNumber) {
            throw new Error('Số điện thoại không đúng định dạng')
        }
    }

    const existUser = await UserModel.findOne({ _id: id })

    if (!existUser) {
        throw new Error('Người dùng không tồn tại')
    }

    const resultUpdate = await UserModel.updateOne({
        fullName,
        phoneNumber,
        address,
        sex,
        dateOfBirth,
        slogan,
    })

    return resultUpdate
}

const getUserInfo = async ({ id }) => {
    const user = await UserModel.findOne({ _id: id })

    if (!user) {
        throw new Error('Người dùng không tồn tại trong hệ thống')
    }

    return { ...user._doc, password: 'Not show' }
}

export default {
    register,
    login,
    updateInfo,
    getUserInfo,
}
