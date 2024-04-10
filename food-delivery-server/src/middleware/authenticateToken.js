import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

dotenv.config()

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) {
        return res.status(401).json({
            message: 'Không có token',
        }) // Trả về lỗi 401 nếu không có token
    }

    jwt.verify(token, process.env.PRIVATE_KEY, (err, user) => {
        if (err) return res.sendStatus(403)

        req.user = user

        next()
    })
}

export default authenticateToken
