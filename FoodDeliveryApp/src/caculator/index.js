export function calculateAge(dateOfBirth) {
    // Chuyển chuỗi ngày sinh thành một đối tượng Date
    const birthday = new Date(dateOfBirth)

    // Lấy ngày hiện tại
    const today = new Date()

    // Tính toán số milliseconds giữa ngày hiện tại và ngày sinh
    const ageDiffMs = today.getTime() - birthday.getTime()

    // Chuyển đổi số milliseconds thành tuổi
    const ageDate = new Date(ageDiffMs)
    const age = Math.abs(ageDate.getUTCFullYear() - 1970)

    return age
}
