export const validDate = (dateString) => {
    // Biểu thức chính quy kiểm tra định dạng YYYY-MM-DD
    var regex = /^\d{2}-\d{2}-\d{4}$/

    // Kiểm tra xem chuỗi nhập vào có khớp với định dạng không
    if (!regex.test(dateString)) {
        return false
    }

    // Kiểm tra xem ngày tháng năm có hợp lệ không
    var parts = dateString.split('-')
    var year = parseInt(parts[2], 10)
    var month = parseInt(parts[1], 10)
    var day = parseInt(parts[0], 10)

    if (month < 1 || month > 12 || day < 1 || day > 31) {
        return false
    }

    // Kiểm tra số ngày trong tháng
    var daysInMonth = new Date(year, month, 0).getDate()
    if (day > daysInMonth) {
        return false
    }

    return true
}

export const validPhoneNumber = (phoneNumber) => {
    return /(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(phoneNumber)
}
