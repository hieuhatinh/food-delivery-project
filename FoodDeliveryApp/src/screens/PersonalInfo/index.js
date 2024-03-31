import { Alert, StyleSheet, Text, View } from 'react-native'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import Button from '../../components/button/Button'
import { global } from '../../global'
import axiosClient from '../../api/axiosClient'
import { calculateAge } from '../../caculator'
import Loading from '../../components/Loading'
import AvatarComp from '../../components/AvatarComp'
import BoundaryScreen from '../../components/BoundaryScreen'
import HeaderSecondary from '../../components/header/HeaderSecondary'

const PersonalInfo = () => {
    const navigation = useNavigation()
    const isFocused = useIsFocused()

    // lấy id người dùng từ store redux
    const userId = useSelector((state) => state.user.id)

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
                        `/user/${userId}/get-information`,
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
        <BoundaryScreen>
            <HeaderSecondary
                iconRightSecond={{
                    name: 'dots-three-horizontal',
                }}
            >
                <Text style={styles.title}>Personal Information</Text>
            </HeaderSecondary>

            {isLoading ? (
                <Loading />
            ) : (
                <View style={styles.content}>
                    <AvatarComp
                        name={
                            userInfo.fullName?.split(' ')[
                                userInfo.fullName?.split(' ').length - 1
                            ] || userInfo.email
                        }
                        slogan={userInfo.slogan || null}
                    />
                    <View style={styles.information}>
                        {/* fullname */}
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

                        {/* sex */}
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

                        {/* Phone number */}
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

                        {/* address */}
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
        </BoundaryScreen>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        marginVertical: 25,
        width: '95%',
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
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
