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
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Link, useIsFocused } from '@react-navigation/native'

import SocialLogin from '../components/SocialLogin'
import { validEmail } from '../../validation'
import Loading from '../../components/Loading'
import { global } from '../../global'
import Button from '../../components/button/Button'
import BoundaryScreen from '../../components/BoundaryScreen'

import { fetchRegister } from '../../store/actions/userAction'
import { selectUser } from '../../store/selector/userSelector'
import { reState } from '../../store/slice/userSlice'

export default function SignUp({ navigation }) {
    const dispatch = useDispatch()
    const userState = useSelector(selectUser)
    const isFocused = useIsFocused()

    const [isOpenSecurePassword, setIsOpenSecurePassword] = useState(true)
    const [isOpenSecureRePassword, setIsOpenSecureRePassword] = useState(true)
    const [password, setPassWord] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [email, setEmail] = useState('')
    const [checkEmail, setCheckEmail] = useState()
    const [checkPassWord, setCheckPassWord] = useState()
    const [checkRePassWord, setCheckRePassWord] = useState()
    const [isDisabled, setIsDisabled] = useState(true)

    // xử lý submit form
    const submit = async () => {
        dispatch(fetchRegister({ email, password }))
    }

    useEffect(() => {
        if (isFocused) {
            dispatch(reState())
            if (userState.isSuccess) {
                Alert.alert('Thông báo', userState.messageNotify, [
                    {
                        text: 'OK',
                        onPress: () => navigation.navigate('SignIn'),
                    },
                ])
            }

            if (userState.isError) {
                Alert.alert('Thông báo', userState.messageNotify)
            }
        }
    }, [userState, isFocused])

    // check validation
    useEffect(() => {
        let isValidEmail, isValidPassword, isValidRePassword
        if (!!email) {
            isValidEmail = validEmail(email)
            setCheckEmail(validEmail(email))
        } else setCheckEmail(true)

        if (!!password) {
            isValidPassword = password.length > 8
            setCheckPassWord(isValidPassword)
        } else setCheckPassWord(true)

        if (!!rePassword) {
            isValidRePassword = password === rePassword
            setCheckRePassWord(isValidRePassword)
        } else setCheckRePassWord(true)

        setIsDisabled(!(isValidEmail && isValidPassword && isValidRePassword))
    }, [email, password, rePassword])

    const showPassword = () => {
        setIsOpenSecurePassword(!isOpenSecurePassword)
    }

    const showRePassword = () => {
        setIsOpenSecureRePassword(!isOpenSecureRePassword)
    }

    const handleChangeEmail = (value) => {
        setEmail(value.trim())
    }

    const handleChangePassword = (value) => {
        setPassWord(value.trim())
    }

    const handleChangeRePassword = (value) => {
        setRePassword(value.trim())
    }

    return (
        <BoundaryScreen>
            <KeyboardAvoidingView behavior='padding' style={{ width: '100%' }}>
                <ScrollView
                    contentContainerStyle={{ alignItems: 'center' }}
                    showsVerticalScrollIndicator={false}
                >
                    {userState.isLoading && <Loading />}
                    <View style={{ width: '90%' }}>
                        <View style={styles.heading}>
                            <Text style={styles.title1}>Let's </Text>
                            <Text
                                style={[
                                    styles.title1,
                                    { color: global.textSixColor },
                                ]}
                            >
                                Sign you up
                            </Text>
                            <Text style={styles.title1}>,</Text>
                            <Text style={styles.title1}>your meal awaits</Text>
                        </View>
                        <Text style={[styles.titel2, styles.pd]}>
                            If you already have an account
                        </Text>
                        <View style={styles.heading}>
                            <Text style={styles.titel2}>please </Text>
                            <Link
                                to={{ screen: 'SignIn' }}
                                style={[
                                    styles.titel2,
                                    { color: global.textSixColor },
                                ]}
                            >
                                Sign in here
                            </Link>
                        </View>

                        {/* Email */}
                        <View style={styles.pd}>
                            <Text style={styles.title3}>Email address</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder='hieu@gmail.com'
                                onChangeText={handleChangeEmail}
                                value={email}
                            />
                            {!checkEmail && (
                                <Text style={styles.warring}>
                                    Email không hợp lệ
                                </Text>
                            )}
                        </View>

                        {/* Password */}
                        <View style={styles.pd}>
                            <Text style={styles.title3}>Password</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder='*********'
                                secureTextEntry={isOpenSecurePassword}
                                onChangeText={handleChangePassword}
                                value={password}
                            />
                            <Icon
                                name='eye'
                                size={20}
                                style={styles.iconPassword}
                                onPress={showPassword}
                            />
                            {!checkPassWord && (
                                <Text style={styles.warring}>
                                    Mật khẩu phải hơn 8 kí tự
                                </Text>
                            )}
                        </View>

                        {/* Confirm password */}
                        <View style={styles.pd}>
                            <Text style={styles.title3}>Confirm Password</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder='*********'
                                secureTextEntry={isOpenSecureRePassword}
                                onChangeText={handleChangeRePassword}
                                value={rePassword}
                            />
                            <Icon
                                name='eye'
                                size={20}
                                style={styles.iconPassword}
                                onPress={showRePassword}
                            />
                            {checkRePassWord === false && (
                                <Text style={styles.warring}>
                                    Mật khẩu không giống nhau
                                </Text>
                            )}
                        </View>

                        {/* Button Signup */}
                        <View style={styles.styleViewButton}>
                            <Button
                                title='SIGN UP'
                                disabled={isDisabled}
                                handlePress={submit}
                                backgroundColor='#E53935'
                            />
                        </View>
                        <View style={[styles.box4]}>
                            <Text style={[styles.text1]}>
                                By signing up, you have agreed to our{' '}
                            </Text>
                            <Text
                                style={[
                                    styles.text1,
                                    { color: global.textLinkColor },
                                ]}
                            >
                                Terms and conditions{' '}
                            </Text>
                            <Text style={[styles.text1]}>& </Text>
                            <Text
                                style={[
                                    styles.text1,
                                    { color: global.textLinkColor },
                                ]}
                            >
                                Privacy policy
                            </Text>
                        </View>
                        <Text
                            style={{
                                fontSize: 16,
                                paddingTop: 10,
                                textAlign: 'center',
                            }}
                        >
                            Or connect with
                        </Text>
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
    box4: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingTop: 50,
        alignItems: 'center',
    },
    text1: {
        fontSize: 14,
        color: '#868686',
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
