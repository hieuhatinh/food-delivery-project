import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Entypo'
import Button from '../../components/button/Button'
import OrderInformation from '../components/OrderInformation'
import BoundaryScreen from '../../components/BoundaryScreen'
import HeaderSecondary from '../../components/header/HeaderSecondary'
import screenName from '../config/screenName'

export default function Payment({ navigation }) {
    const DataOrder = [
        {
            id: 1,
            image: require('../../assets/images/avatar.png'),
            nameRestaurant: 'Nhà hàng của hiếu',
            priceFood: 35,
            quantity: 4,
        },
        {
            id: 2,
            image: require('../../assets/images/avatar.png'),
            nameRestaurant: 'Nhà hàng của hiếu',
            priceFood: 35,
            quantity: 4,
        },
        {
            id: 3,
            image: require('../../assets/images/avatar.png'),
            nameRestaurant: 'Nhà hàng của hiếu',
            priceFood: 35,
            quantity: 4,
        },
        {
            id: 4,
            image: require('../../assets/images/avatar.png'),
            nameRestaurant: 'Nhà hàng của hiếu',
            priceFood: 35,
            quantity: 4,
        },
        {
            id: 5,
            image: require('../../assets/images/avatar.png'),
            nameRestaurant: 'Nhà hàng của hiếu',
            priceFood: 35,
            quantity: 4,
        },
    ]

    const handleNavigateEditInfo = () => {
        navigation.navigate(screenName.editAddressAndContact)
    }

    return (
        <BoundaryScreen style={styles.container}>
            <HeaderSecondary
                iconRightSecond={{
                    name: 'dots-three-horizontal',
                }}
                title='Thanh toán'
            />

            <View style={styles.colBox}>
                <TouchableOpacity
                    style={styles.boxAddress}
                    onPress={console.log('hello')}
                >
                    <Text style={{ paddingBottom: 15 }}>DELIVERY ADDRESS</Text>
                    <Text style={styles.titleAddress}>
                        2118 Thornridge Cir. Syracuse
                    </Text>
                    <Icon
                        name='chevron-thin-right'
                        size={20}
                        style={styles.icons}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.boxPayment}>
                <Text style={styles.titleAddress}>Payment Method</Text>
                <TouchableOpacity
                    style={{ flexDirection: 'row', paddingRight: 25 }}
                    onPress={console.log('hello')}
                >
                    <Text style={styles.title2}>Cash</Text>
                    <Icon name='chevron-thin-right' size={20} />
                </TouchableOpacity>
            </View>
            <FlatList
                data={DataOrder}
                renderItem={({ item }) => <OrderInformation {...item} />}
            />

            <View style={styles.footer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.boxtotalPrice}>
                        <Text style={styles.titletotalPrice}> TOTAl: </Text>
                        <Text style={styles.totalPrice}> ${96}</Text>
                    </View>
                    <View style={{ flex: 1 }} />
                </View>
                <View style={styles.viewButton}>
                    <Button
                        title='Đặt hàng'
                        height={50}
                        handlePress={handleNavigateEditInfo}
                    />
                </View>
            </View>
        </BoundaryScreen>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
    },
    colBox: {
        backgroundColor: '#f0f5fa',
        borderRadius: 10,
        paddingHorizontal: 20,
        width: '90%',
    },
    boxAddress: {
        paddingLeft: 5,
        paddingTop: 10,
        paddingBottom: 30,
    },
    titleAddress: {
        color: '#A0A5BA',
    },
    icons: {
        position: 'absolute',
        right: 0,
        top: 25,
    },
    boxPayment: {
        height: 35,
        marginTop: 5,
        marginBottom: 10,
        backgroundColor: '#f0f5fa',
        borderRadius: 10,
        flexDirection: 'row',
        paddingLeft: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
    },
    title2: {
        paddingHorizontal: 15,
        color: '#FF7622',
    },
    footer: {
        alignItems: 'center',
        height: 130,
        backgroundColor: '#f0f5fa',
        width: '100%',
    },
    titletotalPrice: {
        color: '#A0A5BA',
    },
    totalPrice: {
        fontSize: 20,
        fontWeight: '500',
    },
    boxtotalPrice: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingTop: 20,
    },
    viewButton: {
        width: '90%',
        marginBottom: 10,
        marginTop: 20,
    },
})
