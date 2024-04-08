import React, { useEffect, useState } from 'react'
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useDispatch } from 'react-redux'
import { Link } from '@react-navigation/native'

import SocialLogin from '../components/SocialLogin'
import { validEmail } from '../../validation'
import Loading from '../../components/Loading'
import storage from '../../storage'
import axiosClient from '../../api/axiosClient'
import BoundaryScreen from '../../components/BoundaryScreen'
import Button from '../../components/button/Button'
import { global } from '../../global'

export default function SignIn({ navigation }) {
    const dispatch = useDispatch()

    const [isSelected, setSelection] = useState(true)
    const [passWord, setPassWord] = useState('')
    const [email, setEmail] = useState('')
    const [checkEmail, setCheckEmail] = useState(false)
    const [isDisabled, setIsDisabled] = useState(true)

    // loading và thông báo
    const [loading, setLoading] = useState(false)

    const handleChangeEmail = (value) => {
        setEmail(value)
    }

    const handleChangePassword = (value) => {
        setPassWord(value)
    }

    // xử lý submit form
    const submit = async () => {
        setLoading(true)
        try {
            let user = await axiosClient.post('/user/login', {
                email,
                password: passWord,
            })

            if (user.status === 200) {
                // lưu token vào storage
                storage.save({
                    key: 'user',
                    id: user.data.userInfo._id,
                    data: {
                        token: user.data.token,
                    },
                })

                // gửi 1 dispatch cập nhật userInfo
                dispatch({
                    type: 'user/setUserInfo',
                    payload: {
                        id: user.data.userInfo._id,
                        email: user.data.userInfo.email,
                        fullName: user.data.userInfo.fullName,
                        slogan: user.data.userInfo.slogan,
                    },
                })

                // hiển thị thông báo đăng nhập thành công
                Alert.alert('Thông báo', user.data.message, [
                    {
                        text: 'OK',
                        onPress: () => navigation.replace('BottomTabs'),
                    },
                ])
                setLoading(false)
            }
        } catch (error) {
            if (error.response.status === 404) {
                Alert.alert('Thông báo', error.response.data.message)
                setLoading(false)
            }
        }
    }

    // check validation
    useEffect(() => {
        let isValidEmail = false
        if (!!email) {
            isValidEmail = validEmail(email)
            setCheckEmail(isValidEmail)
            setIsDisabled(!isValidEmail)
        } else setCheckEmail(true)

        setIsDisabled(!(isValidEmail && !!passWord))
    }, [email, passWord])

    const showPassword = () => {
        setSelection(!isSelected)
    }

    return (
        <BoundaryScreen>
            <KeyboardAvoidingView style={{ width: '100%' }} behavior='padding'>
                <ScrollView
                    contentContainerStyle={{ alignItems: 'center' }}
                    showsVerticalScrollIndicator={false}
                >
                    {loading === true && <Loading />}
                    <View style={{ width: '90%' }}>
                        <View style={styles.heading}>
                            <Text style={styles.title1}>Just </Text>
                            <Text
                                style={[
                                    styles.title1,
                                    { color: global.textSixColor },
                                ]}
                            >
                                Sign in
                            </Text>
                            <Text style={styles.title1}>,we'll </Text>
                            <Text style={styles.title1}>prepar your order</Text>
                        </View>

                        <Text style={[styles.titel2, styles.pd]}>
                            If you don't have an account
                        </Text>

                        <View style={styles.heading}>
                            <Text style={styles.titel2}>please </Text>
                            <Link
                                to={{ screen: 'SignUp' }}
                                style={[
                                    styles.titel2,
                                    { color: global.textSixColor },
                                ]}
                            >
                                Sign up here
                            </Link>
                        </View>

                        <View style={styles.pd}>
                            <Text style={styles.title3}>Email address</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder='hieu@gmail.com'
                                onChangeText={handleChangeEmail}
                            />
                            {!checkEmail && (
                                <Text style={styles.warring}>
                                    Email không hợp lệ
                                </Text>
                            )}
                        </View>

                        <View style={styles.pd}>
                            <Text style={styles.title3}>Password</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder='*********'
                                secureTextEntry={isSelected}
                                onChangeText={handleChangePassword}
                            />
                            <Icon
                                name='eye'
                                size={20}
                                style={styles.iconPassword}
                                onPress={showPassword}
                            />
                        </View>

                        <View style={[styles.pd, { alignItems: 'flex-end' }]}>
                            <Text style={{ color: '#939393' }}>
                                Forgot password?
                            </Text>
                        </View>

                        {/* Button Signin */}
                        <View style={styles.styleViewButton}>
                            <Button
                                title='SIGN IN'
                                disabled={isDisabled}
                                handlePress={submit}
                                backgroundColor='#E53935'
                            />
                        </View>

                        <View style={styles.text1}>
                            <Text style={{ fontSize: 16 }}>Or</Text>
                        </View>

                        <SocialLogin
                            socialPlatform='facebook'
                            isDisabled={true}
                            iconName='facebook'
                        />
                        <SocialLogin
                            socialPlatform='google'
                            isDisabled={true}
                            logo={
                                <Image
                                    source={require('../../assets/images/google.png')}
                                    style={{ height: 25, width: 25 }}
                                />
                            }
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </BoundaryScreen>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pd: {
        paddingTop: 20,
    },
    heading: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    title1: {
        fontWeight: 'bold',
        fontSize: 24,
    },
    titel2: {
        fontSize: 16,
        color: '#646982',
    },
    textInput: {
        height: 50,
        backgroundColor: global.backgroundTextInput,
        borderRadius: 12,
        padding: 10,
    },
    title3: {
        fontWeight: '500',
        fontSize: 16,
    },
    styleViewButton: {
        marginTop: 30,
    },
    text1: {
        paddingTop: 100,
        alignItems: 'center',
    },
    warring: {
        textAlign: 'right',
        fontSize: 12,
        color: 'red',
        paddingTop: 3,
    },
    iconPassword: {
        position: 'absolute',
        right: 20,
        top: 55,
    },
})
