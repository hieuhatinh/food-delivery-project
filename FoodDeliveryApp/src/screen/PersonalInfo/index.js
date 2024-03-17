import { Alert, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'

import Button from '../../component/button/Button'
import HeaderSecondary from '../../component/header/HeaderSecondary'
import Avatar from '../../component/Avatar'
import { global } from '../../global'
import axiosClient from '../../api/axiosClient'
import { calculateAge } from '../../caculator'
import Loading from '../../component/Loading'

const PersonalInfo = () => {
    const insets = useSafeAreaInsets()

    const navigation = useNavigation()
    const isFocused = useIsFocused()

    const [userInfo, setUserInfo] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const handlePressEdit = () => {
        navigation.navigate('EditInformation', { userInfo })
    }

    useEffect(() => {
        if (isFocused === true) {
            const fetchData = async () => {
                try {
                    const user = await axiosClient.get(
                        '/user/65e5f6c0fe2f097520f7248c/get-information',
                    )
                    setUserInfo(user.data)

                    setIsLoading(false)
                } catch (error) {
                    if (error.response.status === 404) {
                        Alert.alert('Thông báo', error.response.data.message)
                    }
                    setIsLoading(false)
                }
            }
            fetchData()
        }
    }, [isFocused])

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
            <HeaderSecondary title='Personal Information' />

            {isLoading ? (
                <Loading />
            ) : (
                <View style={styles.content}>
                    <View style={styles.introduce}>
                        <Avatar />
                        <View style={styles.info}>
                            <Text style={styles.textName}>
                                {userInfo.fullName.split(' ')[
                                    userInfo.fullName.split(' ').length - 1
                                ] || userInfo.email}
                            </Text>
                            <Text style={styles.textSlogan}>
                                {userInfo.slogan || null}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.information}>
                        <Text style={styles.text}>
                            Full name:{' '}
                            <Text
                                style={[
                                    styles.text,
                                    !userInfo.fullName && styles.notData,
                                ]}
                            >
                                {!!userInfo.fullName
                                    ? userInfo.fullName
                                    : 'None'}
                            </Text>
                        </Text>
                        <Text style={styles.text}>
                            Sex:{' '}
                            <Text
                                style={[
                                    styles.text,
                                    !userInfo.sex && styles.notData,
                                ]}
                            >
                                {!!userInfo.sex ? userInfo.sex : 'None'}
                            </Text>
                        </Text>
                        {/* Age */}
                        <Text style={styles.text}>
                            Age:{' '}
                            <Text
                                style={[
                                    styles.text,
                                    !userInfo.dateOfBirth && styles.notData,
                                ]}
                            >
                                {!!userInfo.dateOfBirth
                                    ? calculateAge(userInfo.dateOfBirth)
                                    : 'None'}
                            </Text>
                        </Text>
                        <Text style={styles.text}>
                            Phone number:{' '}
                            <Text
                                style={[
                                    styles.text,
                                    !userInfo.phoneNumber && styles.notData,
                                ]}
                            >
                                {!!userInfo.phoneNumber
                                    ? userInfo.phoneNumber
                                    : 'None'}
                            </Text>
                        </Text>
                        <Text style={styles.text}>
                            Address:{' '}
                            <Text
                                style={[
                                    styles.text,
                                    !userInfo.address && styles.notData,
                                ]}
                            >
                                {!!userInfo.address ? userInfo.address : 'None'}
                            </Text>
                        </Text>
                    </View>
                </View>
            )}
            <Button
                title='Edit Information'
                handlePress={handlePressEdit}
                disabled={isLoading ? true : false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        marginVertical: 25,
        width: '90%',
    },
    introduce: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 100,
        overflow: 'hidden',
        resizeMode: 'cover',
    },
    info: {
        flexDirection: 'column',
        marginLeft: 30,
    },
    textName: {
        fontSize: 24,
        color: global.textPrimaryColor,
        fontWeight: '600',
        marginBottom: 10,
    },
    textSlogan: {
        fontSize: 14,
        color: global.textFifthColor,
    },
    information: {
        backgroundColor: global.backgroundPrimaryColor,
        padding: 20,
        borderRadius: 10,
        marginVertical: 25,
    },
    text: {
        fontSize: 16,
        color: global.textPrimaryColor,
        marginVertical: 10,
    },
    notData: {
        color: global.error,
        fontSize: 14,
    },
})

export default PersonalInfo
