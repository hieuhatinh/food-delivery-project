import React from 'react'
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'

import Icon_Info from './components/MenuItem'
import BoundaryIcon from '../../components/button/BoundaryIcon'

const profileCluster = [
    {
        title: 'Personal Info',
        iconName: 'user-o',
        colorIcon: 'red',
        screenNameToNavigate: 'Notification',
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
        title: 'Cart',
        iconName: 'id-card-o',
        colorIcon: '#369aff',
        screenNameToNavigate: 'Notification',
    },
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
    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <BoundaryIcon>
                    <Icon name='chevron-small-left' size={20} />
                </BoundaryIcon>
                <Text style={{ fontSize: 20 }}>Menu Profile</Text>
                <BoundaryIcon>
                    <Icon name='dots-three-horizontal' size={20} />
                </BoundaryIcon>
            </View>
            <ScrollView
                style={styles.scrollMenu}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.box}>
                    <Image
                        source={require('../../assets/images/avatar.png')}
                        style={styles.image}
                    />
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                            Septa
                        </Text>
                        <Text style={{ color: '#a0a5ba', marginTop: 10 }}>
                            I love fast food
                        </Text>
                    </View>
                </View>
                <View style={styles.boxIcon}>
                    {profileCluster.map((item) => (
                        <Icon_Info
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
                        <Icon_Info
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
                        <Icon_Info
                            key={item.title}
                            {...item}
                            onPress={() =>
                                navigation.navigate(item.screenNameToNavigate)
                            }
                        />
                    ))}
                </View>

                <View style={styles.boxIcon}>
                    <Icon_Info
                        title='Log Out'
                        iconName='sign-out'
                        colorIcon='#fa4857'
                        onPress={() => navigation.navigate('Notification')}
                    />
                </View>
                <Text style={{ height: 50 }}></Text>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    containerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingBottom: 10,
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
