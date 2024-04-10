import {
    Alert,
    Image,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native'
import { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome6'
import { useNavigation } from '@react-navigation/native'

import Button from '../../components/button/Button'
import HeaderSecondary from '../../components/header/HeaderSecondary'
import Avatar from '../../components/Avatar'
import { global } from '../../global'
import { validDate, validPhoneNumber } from '../../validation'
import useDebounce from '../../hooks/useDebounce'
import axiosClient from '../../api/axiosClient'
import Loading from '../../components/Loading'
import BoundaryScreen from '../../components/BoundaryScreen'

const items = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'Other' },
]

const EditInformation = ({ route }) => {
    const { userInfo } = route.params

    // thông tin cũ của người dùng
    const labelSex =
        userInfo.sex && items.find((item) => item.value === userInfo.sex).label
    let dateTimeArr = userInfo.dateOfBirth?.substring(0, 10).split('-')
    let dateString =
        !!dateTimeArr && `${dateTimeArr[2]}-${dateTimeArr[1]}-${dateTimeArr[0]}`

    const navigation = useNavigation()

    const [isOpen, setIsOpen] = useState(false) // dropdown list item sex

    const [fullName, setFullName] = useState(userInfo.fullName || null)
    const [sex, setSex] = useState({
        label: labelSex,
        value: userInfo.sex || null,
    })
    const [dateOfBirth, setDateOfBirth] = useState(dateString || null)
    const [phoneNumber, setPhoneNumber] = useState(userInfo.phoneNumber || null)
    const [address, setAddress] = useState(userInfo.address || null)
    const [slogan, setSlogan] = useState(userInfo.slogan || null)
    const [isValidDateBirth, setIsValidDateBirth] = useState()
    const [isValidPhoneNumber, setIsValidPhoneNumber] = useState()
    const [disableSubmit, setDisableSubmit] = useState()

    const [loading, setLoading] = useState(false)

    // dropdown list item sex
    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    const handlePressOutside = () => {
        setIsOpen(false)
    }

    // xử lý fullName, sex
    const handleChangeFullname = (value) => {
        setFullName(value)
    }

    const handleChangeSex = (label, value) => {
        setSex({ label, value })
    }

    const handleChangeDateBirth = (date) => {
        setDateOfBirth(date)
    }

    // kiểm tra và xử lý ngày sinh phù hợp
    const handleCheckValidDateBirth = () => {
        if (!!dateOfBirth) {
            let isValid = validDate(dateOfBirth)
            setIsValidDateBirth(isValid)
        } else {
            setIsValidDateBirth(true)
        }
    }

    useDebounce(dateOfBirth, 150, handleCheckValidDateBirth) // đợi người dùng nhập xong sau 150ms mới bắt đầu kiểm tra

    // kiểm tra và xử lý số điện thoại có hợp lệ không
    const handleChangePhoneNumber = (phoneNumber) => {
        setPhoneNumber(phoneNumber)
    }

    const handleCheckValidPhoneNumber = () => {
        if (!!phoneNumber) {
            let isValid = validPhoneNumber(phoneNumber)
            setIsValidPhoneNumber(isValid)
        } else {
            setIsValidPhoneNumber(true)
        }
    }

    useDebounce(phoneNumber, 150, handleCheckValidPhoneNumber) // đợi người dùng nhập xong sau 150ms mới bắt đầu kiểm tra

    // address và slogan
    const handleChangeAddress = (address) => {
        setAddress(address)
    }

    const handleChangeSlogan = (slogan) => {
        setSlogan(slogan)
    }

    // xử lý khi submit
    const handlePressSubmit = async () => {
        setLoading(true)
        let dateArr = dateOfBirth?.split('-')
        let dateStr = !!dateArr && `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`
        try {
            const userInfoUpdate = await axiosClient.patch(
                `/user/${userInfo._id}/update-information`,
                {
                    fullName: fullName.trim(),
                    phoneNumber: phoneNumber.trim(),
                    address: address.trim(),
                    sex: sex.value.trim(),
                    dateOfBirth: dateStr.trim(),
                    slogan: slogan.trim(),
                },
            )

            if (userInfoUpdate.status === 200) {
                Alert.alert('Thông báo', userInfoUpdate.data.message, [
                    {
                        text: 'OK',
                        onPress: () => navigation.navigate('PersonalInfo'),
                    },
                ])

                setLoading(false)
            }
        } catch (error) {
            if (error.response.status === 404) {
                Alert.alert('Thông báo', error.response.data.message)
            }
            setLoading(false)
        }
    }

    useEffect(() => {
        setDisableSubmit(
            !(
                (!!fullName && fullName !== userInfo.fullName) ||
                (!!sex.value && sex.value !== userInfo.sex) ||
                (!!address && address !== userInfo.address) ||
                (!!slogan && slogan !== userInfo.slogan)
            ),
        )

        if (!!dateOfBirth && dateOfBirth !== dateString) {
            setDisableSubmit(!(isValidDateBirth === true))
        }

        if (!!phoneNumber && phoneNumber !== userInfo.phoneNumber) {
            setDisableSubmit(!(isValidPhoneNumber === true))
        }
    }, [
        fullName,
        sex,
        address,
        slogan,
        dateOfBirth,
        phoneNumber,
        isValidDateBirth,
        isValidPhoneNumber,
    ])

    return (
        <BoundaryScreen>
            {loading && <Loading />}
            <TouchableWithoutFeedback onPress={handlePressOutside}>
                <KeyboardAvoidingView
                    style={styles.keyBoardAvoidingView}
                    behavior='padding'
                >
                    <HeaderSecondary
                        iconRightSecond={{
                            name: 'dots-three-horizontal',
                        }}
                    >
                        <Text style={styles.title}>Edit Information</Text>
                    </HeaderSecondary>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={styles.content}
                        contentContainerStyle={{
                            alignItems: 'center',
                        }}
                    >
                        <View style={styles.viewAvatar}>
                            <Avatar />
                        </View>

                        <View style={{ width: '100%' }}>
                            <Text style={styles.titlePart}>Information</Text>
                            <View style={styles.viewInformation}>
                                {/* fullName */}
                                <View style={styles.viewEditInfo}>
                                    <Text style={styles.text}>Full name:</Text>
                                    <TextInput
                                        value={fullName}
                                        placeholder='Enter your fullname'
                                        style={styles.textInput}
                                        onChangeText={handleChangeFullname}
                                        multiline
                                    />
                                    <Icon name='pencil' size={15} />
                                </View>

                                {/* sex */}
                                <View
                                    style={[
                                        styles.viewEditInfo,
                                        { zIndex: 100 },
                                    ]}
                                >
                                    <Text style={styles.text}>Sex:</Text>
                                    <TouchableOpacity
                                        style={[
                                            styles.textInput,
                                            styles.dropdown,
                                        ]}
                                        activeOpacity={0.9}
                                        onPress={toggleDropdown}
                                    >
                                        <Text style={styles.textDropdown}>
                                            {sex.label !== null
                                                ? sex.label
                                                : 'None'}
                                        </Text>
                                        <Icon name='chevron-down' size={10} />
                                        {isOpen && (
                                            <View style={styles.dropdownMenu}>
                                                {items.map((item) => (
                                                    <TouchableOpacity
                                                        key={item.value}
                                                        style={
                                                            styles.dropdownItem
                                                        }
                                                        onPress={() =>
                                                            handleChangeSex(
                                                                item.label,
                                                                item.value,
                                                            )
                                                        }
                                                    >
                                                        <Text>
                                                            {item.label}
                                                        </Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                    <Icon name='user-tag' size={15} />
                                </View>

                                {/* date of birth */}
                                <View>
                                    <View style={styles.viewEditInfo}>
                                        <Text
                                            style={[
                                                styles.text,
                                                isValidDateBirth === false && {
                                                    color: global.error,
                                                },
                                            ]}
                                        >
                                            Date of birth:
                                        </Text>
                                        <TextInput
                                            style={[
                                                styles.textInput,
                                                isValidDateBirth === false &&
                                                    styles.inputBoxError,
                                            ]}
                                            value={dateOfBirth}
                                            placeholder='dd-mm-yyyy'
                                            onChangeText={handleChangeDateBirth}
                                        />
                                        <Icon name='calendar-alt' size={15} />
                                    </View>
                                    {isValidDateBirth === false &&
                                        !!dateOfBirth && (
                                            <Text style={styles.errorMessage}>
                                                Incorrect format dd-mm-yyyy
                                            </Text>
                                        )}
                                </View>

                                {/* phone number */}
                                <View>
                                    <View style={styles.viewEditInfo}>
                                        <Text
                                            style={[
                                                styles.text,
                                                isValidPhoneNumber ===
                                                    false && {
                                                    color: global.error,
                                                },
                                            ]}
                                        >
                                            Phone number:
                                        </Text>
                                        <TextInput
                                            value={phoneNumber}
                                            style={[
                                                styles.textInput,
                                                isValidPhoneNumber === false &&
                                                    styles.inputBoxError,
                                            ]}
                                            placeholder='09xxxxxxxx'
                                            onChangeText={
                                                handleChangePhoneNumber
                                            }
                                        />
                                        <Icon name='phone' size={15} />
                                        <Image
                                            source={require('../../assets/images/vietnam-flag.png')}
                                            style={{
                                                height: 25,
                                                width: 25,
                                                marginLeft: 10,
                                            }}
                                        />
                                    </View>
                                    {isValidPhoneNumber === false && (
                                        <Text style={styles.errorMessage}>
                                            Incorrect phone number format(The
                                            phone number has a length of 10 and
                                            is a Vietnamese phone number)
                                        </Text>
                                    )}
                                </View>

                                {/* address */}
                                <View style={styles.viewEditInfo}>
                                    <Text style={styles.text}>Address:</Text>
                                    <TextInput
                                        style={styles.textInput}
                                        value={address}
                                        placeholder='Ex: 123 NewYork USA'
                                        onChangeText={handleChangeAddress}
                                        multiline
                                    />
                                    <Icon name='map-location' size={15} />
                                </View>
                            </View>
                        </View>

                        <View style={{ width: '100%' }}>
                            <Text style={styles.titlePart}>Slogan</Text>
                            <View style={styles.viewInformation}>
                                <View style={styles.viewEditInfo}>
                                    <TextInput
                                        value={slogan}
                                        placeholder='Write down your thoughts here'
                                        onChangeText={handleChangeSlogan}
                                        style={[styles.textSlogan]}
                                        multiline
                                    />
                                    <Icon name='pencil' size={15} />
                                </View>
                            </View>
                        </View>

                        <View style={styles.viewButton}>
                            <Button
                                title='Submit'
                                handlePress={handlePressSubmit}
                                disabled={disableSubmit}
                            />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </BoundaryScreen>
    )
}

const styles = StyleSheet.create({
    keyBoardAvoidingView: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        marginVertical: 25,
        width: '95%',
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
    },
    viewAvatar: {
        alignItems: 'center',
    },
    viewInformation: {
        backgroundColor: global.backgroundPrimaryColor,
        padding: 20,
        borderRadius: 10,
        marginBottom: 25,
        marginTop: 10,
    },
    titlePart: {
        fontWeight: '700',
        fontSize: 18,
    },
    viewEditInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    errorMessage: {
        color: global.error,
        fontSize: 13,
        marginBottom: 10,
        fontStyle: 'italic',
    },
    inputBoxError: {
        borderBottomColor: global.error,
    },
    text: {
        fontSize: 16,
        color: global.textPrimaryColor,
        marginVertical: 10,
    },
    textInput: {
        borderBottomWidth: 1,
        marginLeft: 10,
        marginRight: 15,
        minWidth: 100,
        maxWidth: 150,
    },
    textSlogan: {
        borderBottomWidth: 1,
        marginLeft: 10,
        marginRight: 15,
        width: '80%',
    },
    viewButton: {
        width: '100%',
    },

    // dropdown
    dropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    textDropdown: {
        flex: 1,
    },
    dropdownMenu: {
        backgroundColor: '#fff',
        padding: 10,
        position: 'absolute',
        width: '100%',
        top: 20,
        left: 0,
        right: 0,
        display: 'flex',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    dropdownItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
})

export default EditInformation
