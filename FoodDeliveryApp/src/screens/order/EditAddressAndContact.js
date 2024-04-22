import {
    Alert,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    View,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Entypo'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native'

import Button from '../../components/button/Button'
import HeaderSecondary from '../../components/header/HeaderSecondary'
import BoundaryScreen from '../../components/BoundaryScreen'
import { validPhoneNumber } from '../../validation'
import useDebounce from '../../hooks/useDebounce'
import { global } from '../../global'
import Loading from '../../components/Loading'

import screenName from '../config/screenName'
import { reState } from '../../store/slice/orderSlice'
import {
    fetchCreateDeliveryAddress,
    fetchDeleteDeliveryAddress,
    fetchUpdateDeliveryAddress,
} from '../../store/actions/deliveryAddressAction'
import { selectDeliveryAddress } from '../../store/selector/deliveryAddressSelector'

const EditAddressAndContact = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const dispatch = useDispatch()
    const { isLoading, isError, isSuccess, messageNotify } = useSelector(
        selectDeliveryAddress,
    )
    const method = route.params.method.toLowerCase()
    const infoAddress = route.params

    const [name, setName] = useState(infoAddress.recipientName || null)
    const [phoneNumber, setPhoneNumber] = useState(
        infoAddress.contactPhoneNumber || null,
    )
    const [address, setAddress] = useState(infoAddress.deliveryAddress || null)
    const [isEnabled, setIsEnabled] = useState(infoAddress.isDefault || false)
    const [isValidPhoneNumber, setIsValidPhoneNumber] = useState()
    const [error, setError] = useState()

    const handleChangeFullname = (value) => {
        setName(value)
    }

    const handleChangeAddress = (address) => {
        setAddress(address)
    }

    // xử lý đặt làm địa chỉ mặc định
    const toggleSwitch = () => {
        if (infoAddress.isDefault) {
            Alert.alert(
                'Cảnh báo',
                'Để xoá địa chỉ mặc định này, vui lòng chọn địa chỉ khác làm địa chỉ mặc định.',
                [
                    {
                        text: 'OK',
                        style: 'cancel',
                    },
                ],
            )
        } else {
            setIsEnabled((previousState) => !previousState)
        }
    }

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

    useDebounce(phoneNumber, 150, handleCheckValidPhoneNumber)

    // xử lý submit
    const handleSubmitChangeAddress = () => {
        if (!(!!name && !!address && !!phoneNumber && isValidPhoneNumber)) {
            setError(true)
        } else {
            setError(false)
            if (method === 'post') {
                dispatch(
                    fetchCreateDeliveryAddress({
                        deliveryAddress: address.trim(),
                        contactPhoneNumber: phoneNumber.trim(),
                        recipientName: name.trim(),
                        isDefault: isEnabled,
                    }),
                )
            }
            if (method === 'put') {
                dispatch(
                    fetchUpdateDeliveryAddress({
                        idAddress: infoAddress._id,
                        deliveryAddress: address.trim(),
                        contactPhoneNumber: phoneNumber.trim(),
                        recipientName: name.trim(),
                        isDefault: isEnabled,
                    }),
                )
            }
        }
    }

    // xử lý xoá địa chỉ
    const deleteAddress = () => {
        dispatch(fetchDeleteDeliveryAddress({ idAddress: infoAddress._id }))
    }
    const handleDeleteAddress = () => {
        if (infoAddress.isDefault) {
            Alert.alert('Cảnh báo', 'Không thể xoá địa chỉ mặc định', [
                {
                    text: 'OK',
                    style: 'cancel',
                },
            ])
        } else {
            Alert.alert('Cảnh báo', 'Bạn có chắc chắn muốn địa chỉ này?', [
                {
                    text: 'Chắc chắn',
                    onPress: deleteAddress,
                    style: 'destructive',
                },
                {
                    text: 'Huỷ',
                    style: 'cancel',
                },
            ])
        }
    }

    // xử lý thông báo
    useEffect(() => {
        if (isSuccess) {
            Alert.alert('Thông báo', messageNotify, [
                {
                    text: 'OK',
                    onPress: () => navigation.goBack(),
                },
            ])

            dispatch(reState())
        }

        if (isError) {
            Alert.alert('Lỗi', messageNotify)
        }
    }, [isError, isSuccess])

    return (
        <BoundaryScreen>
            <KeyboardAvoidingView
                style={styles.keyBoardAvoidingView}
                behavior='padding'
            >
                <HeaderSecondary
                    iconRightSecond={{
                        name: 'dots-three-horizontal',
                    }}
                    title='Địa chỉ giao hàng'
                />

                {isLoading && <Loading />}

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                    style={styles.scrollView}
                    contentContainerStyle={{
                        alignItems: 'center',
                    }}
                >
                    <View style={styles.content}>
                        <View style={styles.viewEdit}>
                            <View style={styles.viewTextInput}>
                                <View style={styles.row}>
                                    <Text>Full Name:</Text>
                                    <TextInput
                                        multiline={true}
                                        value={name}
                                        style={[
                                            styles.input,
                                            error &&
                                                !name &&
                                                styles.inputBoxError,
                                        ]}
                                        onChangeText={handleChangeFullname}
                                        placeholder='Nguyễn Văn A'
                                    />
                                    <Icon name='edit' size={15} />
                                </View>
                                {error && !name && (
                                    <Text style={styles.errorMessage}>
                                        Trường này bắt buộc nhập
                                    </Text>
                                )}
                            </View>
                            <View style={styles.viewTextInput}>
                                <View style={styles.row}>
                                    <Text>Phone Number:</Text>
                                    <TextInput
                                        multiline={true}
                                        value={phoneNumber}
                                        style={[
                                            styles.input,
                                            ((error && !phoneNumber) ||
                                                !isValidPhoneNumber) &&
                                                styles.inputBoxError,
                                        ]}
                                        onChangeText={handleChangePhoneNumber}
                                        placeholder='0xxxxxxxxx'
                                    />
                                    <Icon name='edit' size={15} />
                                </View>
                                {error && !phoneNumber && (
                                    <Text style={styles.errorMessage}>
                                        Trường này bắt buộc nhập
                                    </Text>
                                )}
                                {!isValidPhoneNumber && (
                                    <Text style={styles.errorMessage}>
                                        Định dạng số không đúng với số Việt Nam
                                    </Text>
                                )}
                            </View>
                            <View style={styles.viewTextInput}>
                                <View style={styles.row}>
                                    <Text>Address:</Text>
                                    <TextInput
                                        multiline={true}
                                        numberOfLines={3}
                                        value={address}
                                        style={[
                                            styles.input,
                                            error &&
                                                !address &&
                                                styles.inputBoxError,
                                        ]}
                                        onChangeText={handleChangeAddress}
                                        placeholder='Ngách..., Ngõ..., Phường...'
                                    />
                                    <Icon name='edit' size={15} />
                                </View>
                                {error && !address && (
                                    <Text style={styles.errorMessage}>
                                        Trường này bắt buộc nhập
                                    </Text>
                                )}
                            </View>
                            <View style={styles.viewSwitch}>
                                <Text>Đặt làm địa chỉ mặc định</Text>
                                <Switch
                                    trackColor={{
                                        false: '#767577',
                                        true: global.primaryColor,
                                    }}
                                    thumbColor={
                                        isEnabled
                                            ? global.fourthColor
                                            : '#f4f3f4'
                                    }
                                    ios_backgroundColor='#3e3e3e'
                                    onValueChange={toggleSwitch}
                                    value={isEnabled}
                                />
                            </View>
                        </View>
                        {/* submit */}
                        <View style={styles.viewButton}>
                            {method === 'put' && (
                                <Button
                                    outline
                                    title={'Xoá địa chỉ này'}
                                    handlePress={handleDeleteAddress}
                                />
                            )}
                            <Button
                                title={'Submit'}
                                handlePress={handleSubmitChangeAddress}
                            />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </BoundaryScreen>
    )
}

export default EditAddressAndContact

const styles = StyleSheet.create({
    keyBoardAvoidingView: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    scrollView: {
        width: '100%',
        height: '100%',
    },
    content: {
        backgroundColor: '#F0F5FA',
        marginVertical: 25,
        width: '90%',
        borderRadius: 10,
        alignItems: 'center',
    },
    viewEdit: {
        marginTop: 50,
        marginBottom: 20,
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    viewTextInput: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    input: {
        borderBottomWidth: 1,
        marginHorizontal: 15,
        minWidth: 100,
        maxWidth: 200,
    },
    inputBoxError: {
        borderBottomColor: global.error,
    },
    viewButton: {
        width: '90%',
        marginBottom: 10,
        marginTop: 20,
    },
    errorMessage: {
        color: global.error,
        fontSize: 13,
        marginBottom: 10,
        fontStyle: 'italic',
    },
    viewSwitch: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
})
