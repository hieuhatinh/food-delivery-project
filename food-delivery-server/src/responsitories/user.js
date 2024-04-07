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
        userInfo: { ...user._doc, token, password: 'Not show' },
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
    const existUser = await UserModel.findOne({ _id: id })

    if (!existUser) {
        throw new Error('Người dùng không tồn tại')
    }

    const resultUpdate = dateOfBirth
        ? await UserModel.updateOne(
              { _id: id },
              {
                  fullName,
                  phoneNumber,
                  dateOfBirth,
                  address,
                  sex,
                  slogan,
              },
          )
        : await UserModel.updateOne(
              { _id: id },
              {
                  fullName,
                  phoneNumber,
                  address,
                  sex,
                  slogan,
              },
          )

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
