import React from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import HeaderSecondary from '../../components/header/HeaderSecondary'
import AvatarComp from '../../components/AvatarComp'
import BoundaryScreen from '../../components/BoundaryScreen'
import MenuItem from '../components/MenuItem'

import { logout } from '../../store/slice/userSlice'
import { selectUserInfo } from '../../store/selector'

const profileCluster = [
    {
        title: 'Personal Info',
        iconName: 'user-o',
        colorIcon: 'red',
        screenNameToNavigate: 'PersonalInfo',
    },
    {
        title: 'Addresses',
        iconName: 'map-o',
        colorIcon: '#3f3cfa',
        screenNameToNavigate: 'Notification',
    },
]

const orderAndPaymentCluster = [
    {
        title: 'Favourite',
        iconName: 'heart-o',
        colorIcon: '#b13cfa',
        screenNameToNavigate: 'Notification',
    },
    {
        title: 'Notifications',
        iconName: 'bell-o',
        colorIcon: '#ffa929',
        screenNameToNavigate: 'Notification',
    },
    {
        title: 'Payment Method',
        iconName: 'cc-visa',
        colorIcon: '#82c1ff',
        screenNameToNavigate: 'Notification',
    },
]

const supportCluster = [
    {
        title: 'FAQs',
        iconName: 'tag',
        colorIcon: '#fc9a77',
        screenNameToNavigate: 'Notification',
    },
    {
        title: 'User Reviews',
        iconName: 'odnoklassniki',
        colorIcon: '#2be0e0',
        screenNameToNavigate: 'Notification',
    },
    {
        title: 'Settings',
        iconName: 'gear',
        colorIcon: '#8886fc',
        screenNameToNavigate: 'Notification',
    },
]

const MenuProfile = ({ navigation }) => {
    const userInfo = useSelector(selectUserInfo)
    const dispatch = useDispatch()

    const handleSignOut = () => {
        dispatch(logout())

        navigation.replace('SignIn')
    }

    return (
        <BoundaryScreen>
            <HeaderSecondary
                iconLeft={false}
                iconRightSecond={{
                    name: 'dots-three-horizontal',
                }}
            >
                <Text style={styles.title}>Menu Profile</Text>
            </HeaderSecondary>
            <ScrollView
                style={styles.scrollMenu}
                showsVerticalScrollIndicator={false}
            >
                <AvatarComp
                    name={
                        userInfo.fullName?.split(' ')[
                            userInfo.fullName?.split(' ').length - 1
                        ] || userInfo.email
                    }
                    slogan={userInfo.slogan}
                />
                <View style={styles.boxIcon}>
                    {profileCluster.map((item) => (
                        <MenuItem
                            key={item.title}
                            {...item}
                            onPress={() =>
                                navigation.navigate(item.screenNameToNavigate)
                            }
                        />
                    ))}
                </View>

                <View style={styles.boxIcon}>
                    {orderAndPaymentCluster.map((item) => (
                        <MenuItem
                            key={item.title}
                            {...item}
                            onPress={() =>
                                navigation.navigate(item.screenNameToNavigate)
                            }
                        />
                    ))}
                </View>

                <View style={styles.boxIcon}>
                    {supportCluster.map((item) => (
                        <MenuItem
                            key={item.title}
                            {...item}
                            onPress={() =>
                                navigation.navigate(item.screenNameToNavigate)
                            }
                        />
                    ))}
                </View>

                <View style={styles.boxIcon}>
                    <MenuItem
                        title='Log Out'
                        iconName='sign-out'
                        colorIcon='#fa4857'
                        onPress={handleSignOut}
                    />
                </View>
                <Text style={{ height: 50 }}></Text>
            </ScrollView>
        </BoundaryScreen>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#fff',
    },
    scrollMenu: {
        width: '95%',
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
    },
    box: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 30,
    },
    boxIcon: {
        backgroundColor: '#f0f5fa',
        borderRadius: 10,
        marginTop: 30,
        padding: 10,
    },
    image: {
        height: 100,
        width: 100,
        marginRight: 40,
        borderRadius: 50,
    },
})
export default MenuProfile
