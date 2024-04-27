export default formatCurrency = (price) => {
    return price?.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
    })
}