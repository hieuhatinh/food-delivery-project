export const checkDateOfBirth = (req, res, next) => {
    const dateOfBirth = req.body.dateOfBirth
    if (dateOfBirth) {
        const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth)
        if (!isValidDate) {
            throw new Error('Ngày sinh không đúng định dạng yyyy-mm-dd')
        }

        req.locals.dateOfBirth = dateOfBirth

        next()
    }
}

export const checkPhoneNumber = (req, res, next) => {
    if (req.body.phoneNumber) {
        const isValidPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(
            phoneNumber,
        )

        if (!isValidPhoneNumber) {
            throw new Error('Số điện thoại không đúng định dạng')
        }

        req.locals.phoneNumber = req.body.phoneNumber

        next()
    }
}
