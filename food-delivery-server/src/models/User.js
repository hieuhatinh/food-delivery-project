import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'

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
        enum: ['user', 'seller'],
    },
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    this.password = await bcrypt.hash(
        this.password,
        parseInt(process.env.SALT_ROUNDS),
    )
})

userSchema.method('comparePassword', async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
})

const UserModel = mongoose.model('Users', userSchema)

export default UserModel
