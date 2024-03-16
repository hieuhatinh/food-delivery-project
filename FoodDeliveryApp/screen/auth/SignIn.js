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
import { validEmail } from '../../validation/index'

export default function SignIn({ navigation }) {
    const insets = useSafeAreaInsets()

    const [isSelected, setSelection] = useState(true)
    const [passWord, setPassWord] = useState('')
    const [email, setEmail] = useState('')
    const [checkEmail, setCheckEmail] = useState(false)
    const [isDisabled, setIsDisabled] = useState(true)

    const handleChangeEmail = (value) => {
        setEmail(value)
    }

    const handleChangePassword = (value) => {
        setPassWord(value)
    }

    const handleNavigate = () => navigation.navigate('SignUp')

    const submit = () => {
        let formData = { _email: email, _password: passWord }
    }

    useEffect(() => {
        let isValidEmail = false
        if (!!email) {
            isValidEmail = validEmail(email)
            setCheckEmail(isValidEmail)
            setIsDisabled(!isValidEmail)
        }

        setIsDisabled(!(isValidEmail && !!passWord))
    }, [email, passWord])

    const showPassword = () => {
        if (isSelected) setSelection(false)
        else setSelection(true)
    }
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
                        <Text style={styles.title1}>Just </Text>
                        <Text style={[styles.title1, { color: '#F44336' }]}>
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
                        <TouchableOpacity onPress={handleNavigate}>
                            <Text style={[styles.titel2, { color: '#F44336' }]}>
                                Sign up here
                            </Text>
                        </TouchableOpacity>
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
                        <TouchableOpacity
                            style={styles.iconPassword}
                            onPress={showPassword}
                        >
                            <Icon name='eye' size={20} />
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.pd, { alignItems: 'flex-end' }]}>
                        <Text style={{ color: '#939393' }}>
                            Forgot password?
                        </Text>
                    </View>

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
                                SIGN IN
                            </Text>
                        </TouchableOpacity>
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