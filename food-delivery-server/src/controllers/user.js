import { userResponsitories } from '../responsitories/index.js'

const register = async (req, res) => {
    const { email, password } = req.body

    try {
        const newUser = await userResponsitories.register({ email, password })

        return res.status(200).json({
            ...newUser,
        })
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            message: error.message,
        })
    }
}

const login = async (req, res) => {}

export default {
    register,
    login,
}
