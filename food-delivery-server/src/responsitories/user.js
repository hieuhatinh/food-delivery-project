import { UserModel } from '../models/index.js'

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
        userInfo: { ...newUser },
    }
}

const login = async () => {}

export default {
    register,
    login,
}
