import React, { useEffect, useState } from 'react'
import {
    Image,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/FontAwesome5'

import SocialLogin from './components/SocialLogin'
import { validEmail } from '../../validation'

export default function SignUp({ navigation }) {
    const insets = useSafeAreaInsets()

    const [isOpenSecurePassword, setIsOpenSecurePassword] = useState(true)
    const [isOpenSecureRePassword, setIsOpenSecureRePassword] = useState(true)
    const [passWord, setPassWord] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [email, setEmail] = useState('')
    const [checkEmail, setCheckEmail] = useState()
    const [checkPassWord, setCheckPassWord] = useState()
    const [checkRePassWord, setCheckRePassWord] = useState()
    const [isDisabled, setIsDisabled] = useState(true)

    const submit = () => {
        let formData = { _email: email, _password: passWord }
    }

    useEffect(() => {
        let isValidEmail, isValidPassword, isValidRePassword
        if (!!email) {
            isValidEmail = validEmail(email)
            setCheckEmail(validEmail(email))
        } else setCheckEmail(true)

        if (!!passWord) {
            isValidPassword = passWord.length > 8
            setCheckPassWord(isValidPassword)
        } else setCheckPassWord(true)

        if (!!rePassword) {
            isValidRePassword = passWord === rePassword
            setCheckRePassWord(isValidRePassword)
        } else setCheckRePassWord(true)

        setIsDisabled(!(isValidEmail && isValidPassword && isValidRePassword))
    }, [email, passWord, rePassword])

    const showPassword = () => {
        setIsOpenSecurePassword(!isOpenSecurePassword)
    }

    const showRePassword = () => {
        setIsOpenSecureRePassword(!isOpenSecureRePassword)
    }

    const handleChangeEmail = (value) => {
        setEmail(value)
    }

    const handleChangePassword = (value) => {
        setPassWord(value)
    }

    const handleChangeRePassword = (value) => {
        setRePassword(value)
    }

    const handleNavigate = () => navigation.navigate('SignIn')

    return (
        <View
            style={[
                styles.container,
                {
                    paddingTop: insets.top + 10,
                    paddingBottom: insets.bottom + 20,
                    paddingLeft: insets.left,
                    paddingRight: insets.right,
                },
            ]}
        >
            <KeyboardAvoidingView style={{ width: '90%' }} behavior='padding'>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.heading}>
                        <Text style={styles.title1}>Let's </Text>
                        <Text style={[styles.title1, { color: '#F44336' }]}>
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
                        <TouchableOpacity onPress={handleNavigate}>
                            <Text style={[styles.titel2, { color: '#F44336' }]}>
                                Sign in here
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Email */}
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

                    {/* Password */}
                    <View style={styles.pd}>
                        <Text style={styles.title3}>Password</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder='*********'
                            secureTextEntry={isOpenSecurePassword}
                            onChangeText={handleChangePassword}
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
                            passwordRules={false}
                            onChangeText={(value) => setRePassword(value)}
                        /> 
                        <TouchableOpacity
                            onChangeText={handleChangeRePassword}
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
                    <View style={styles.pd}>
                        <TouchableOpacity
                            style={[
                                styles.styleButton,
                                isDisabled && { backgroundColor: '#ccc' },
                            ]}
                            onPress={submit}
                            disabled={isDisabled}
                        >
                            <Text
                                style={[
                                    styles.title1,
                                    { fontSize: 16, color: '#fff' },
                                ]}
                            >
                                SIGN UP
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.box4]}>
                        <Text style={[styles.text1]}>
                            By signing up, you have agreed to our{' '}
                        </Text>
                        <Text style={[styles.text1, { color: '#3567E7' }]}>
                            Terms and conditions{' '}
                        </Text>
                        <Text style={[styles.text1]}>& </Text>
                        <Text style={[styles.text1, { color: '#3567E7' }]}>
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
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
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
        backgroundColor: '#EBEBEB',
        borderRadius: 12,
        padding: 10,
    },
    title3: {
        fontWeight: '500',
        fontSize: 16,
    },
    styleButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E53935',
        height: 50,
        borderRadius: 12,
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