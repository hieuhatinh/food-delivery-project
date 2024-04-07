import { Alert, StyleSheet, Text, View } from 'react-native'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Button from '../../components/button/Button'
import { global } from '../../global'
import { calculateAge } from '../../caculator'
import Loading from '../../components/Loading'
import AvatarComp from '../../components/AvatarComp'
import BoundaryScreen from '../../components/BoundaryScreen'
import HeaderSecondary from '../../components/header/HeaderSecondary'

import { selectUser, selectUserInfo } from '../../store/selector'
import { fetchGetUserInfo } from '../../store/actions/userAction'
import { reState } from '../../store/slice/userSlice'

const PersonalInfo = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const isFocused = useIsFocused()
    const userState = useSelector(selectUser)
    const userInfo = useSelector(selectUserInfo)

    const handlePressEdit = () => {
        navigation.navigate('EditInformation', { userInfo })
    }

    useEffect(() => {
        if (isFocused === true) {
            dispatch(fetchGetUserInfo({idUser: userInfo._id}))
        }
    }, [isFocused])

    useEffect(() => {
        if (isFocused) {
            dispatch(reState())
            if (userState.isError) {
                Alert.alert('Thông báo', userState.messageNotify)
            }
        }
    }, [isFocused, userState])

    return (
        <BoundaryScreen>
            <HeaderSecondary
                iconRightSecond={{
                    name: 'dots-three-horizontal',
                }}
            >
                <Text style={styles.title}>Personal Information</Text>
            </HeaderSecondary>

            {userState.isLoading ? (
                <View style={{ height: '100%', width: '100%', top: 0 }}>
                    <Loading />
                </View>
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
                disabled={userState.isLoading}
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
        textTransform: 'capitalize',
    },
    notData: {
        color: global.error,
        fontSize: 14,
    },
})

export default PersonalInfo
