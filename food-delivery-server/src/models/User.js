import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'

import CartModel from './Cart.js'

const userSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    fullName: {
        type: String,
        require: false,
        default: null,
    },
    phoneNumber: {
        type: String,
        require: false,
    },
    address: {
        type: String,
        require: false,
        default: null,
    },
    sex: {
        enum: ['male', 'female', 'other'],
        type: String,
        default: null,
        require: false,
    },
    dateOfBirth: {
        type: Date,
        require: false,
        default: null,
    },
    slogan: {
        type: String,
        require: false,
        default: null,
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'restaurant'],
    },
    cartId: {
        type: Schema.Types.ObjectId, 
        ref: 'carts'
    }
})

// hash password của người dùng trước khi lưu
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    this.password = await bcrypt.hash(
        this.password,
        parseInt(process.env.SALT_ROUNDS),
    )
})

// tạo giỏ hàng cho người dùng trước khi lưu (đăng kí)
userSchema.pre('save', async function (next) {
    // Đảm bảo rằng giỏ hàng được tạo trước khi người dùng được lưu vào cơ sở dữ liệu
    try {
        if (!this.isNew) {
            // Chỉ thực hiện nếu đây là lần tạo mới người dùng
            return next()
        }

        // Tạo giỏ hàng mới
        const newCart = await CartModel.create({meals: []})
        console.log(newCart)
        // Liên kết giỏ hàng mới với người dùng
        this.cartId = newCart._id
        next()
    } catch (error) {
        next(error)
    }
})

userSchema.method('comparePassword', async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
})

const UserModel = mongoose.model('Users', userSchema)

export default UserModel
