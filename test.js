useEffect(() => {
    if (
        !fullName &&
        !sex.value &&
        !dateOfBirth &&
        !phoneNumber &&
        !address &&
        !slogan &&
        !isValidDateBirth &&
        !isValidPhoneNumber
    ) {
        setDisableSubmit(true)
    } else {
        setDisableSubmit(false)
    }
}, [
    fullName,
    sex,
    dateOfBirth,
    phoneNumber,
    address,
    slogan,
    isValidDateBirth,
    isValidPhoneNumber,
])