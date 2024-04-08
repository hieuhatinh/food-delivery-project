import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { ScrollView } from 'react-native'
import { useState } from 'react'

import HeaderSecondary from '../components/header/HeaderSecondary'
import OrderOnGoing from './components/OrderOnGoing'
import { global } from '../global'
import BoundaryScreen from '../components/BoundaryScreen'

export default function MyOrder() {
    const DataFoodOnGoing = [
        {
            id: 123456,
            loai_mon_an: 'Food',
            nameFood: 'Pizza Hut',
            price: 45,
            item: 1,
            image: require('../assets/images/avatar.png'),
        },
        {
            id: 235322,
            loai_mon_an: 'Food',
            nameFood: 'Pizza Hut',
            price: 45,
            item: 1,
            image: require('../assets/images/avatar.png'),
        },
        {
            id: 234534,
            loai_mon_an: 'Food',
            nameFood: 'Pizza Hut',
            price: 45,
            item: 1,
            image: require('../assets/images/avatar.png'),
        },
        ,
        {
            id: 454532,
            loai_mon_an: 'Food',
            nameFood: 'Pizza Hut',
            price: 45,
            item: 1,
            image: require('../assets/images/avatar.png'),
        },
    ]
    const DataFoodHistory = [
        {
            id: 123456,
            loai_mon_an: 'Food',
            nameFood: 'Pizza Hut',
            price: 45,
            dateTime: '29 Jan, 12:30',
            item: 1,
            image: require('../assets/images/avatar.png'),
            status: 'Completed',
        },
        {
            id: 235322,
            loai_mon_an: 'Food',
            nameFood: 'Pizza Hut',
            price: 45,
            dateTime: '29 Jan, 12:30',
            item: 1,
            image: require('../assets/images/avatar.png'),
            status: 'Canceled',
        },
        {
            id: 234534,
            loai_mon_an: 'Food',
            nameFood: 'Pizza Hut',
            price: 45,
            dateTime: '29 Jan, 12:30',
            item: 1,
            image: require('../assets/images/avatar.png'),
            status: 'Completed',
        },
        ,
        {
            id: 454532,
            loai_mon_an: 'Food',
            nameFood: 'Pizza Hut',
            price: 45,
            dateTime: '29 Jan, 12:30',
            item: 1,
            image: require('../assets/images/avatar.png'),
            status: 'Canceled',
        },
    ]

    const [check, setCheck] = useState(true)
    const [borderColor1, setBorderColor1] = useState(global.primaryColor)
    const [borderColor2, setBorderColor2] = useState('#CED7DF')

    const showOnGoing = () => {
        check === true ? setCheck(check) : setCheck(!check)
        setBorderColor1(global.primaryColor)
        setBorderColor2('#CED7DF')
    }
    const showHistory = () => {
        check === true ? setCheck(!check) : setCheck(check)
        setBorderColor1('#CED7DF')
        setBorderColor2(global.primaryColor)
    }

    return (
        <BoundaryScreen>
            <HeaderSecondary
                iconRightSecond={{ name: 'dots-three-horizontal' }}
            >
                <Text style={styles.title}>My order</Text>
            </HeaderSecondary>
            <View style={styles.navBar}>
                <TouchableOpacity
                    style={[styles.btn, { borderBottomColor: borderColor1 }]}
                    onPress={showOnGoing}
                >
                    <Text style={{ color: borderColor1 }}>Ongoing</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.btn, { borderBlockColor: borderColor2 }]}
                    onPress={showHistory}
                >
                    <Text style={{ color: borderColor2 }}>History</Text>
                </TouchableOpacity>
            </View>
            {check && (
                <ScrollView>
                    {DataFoodOnGoing.map((item) => (
                        <OrderOnGoing key={item.id} {...item} />
                    ))}
                </ScrollView>
            )}
            {!check && (
                <ScrollView>
                    {DataFoodHistory.map((item) => (
                        <OrderOnGoing
                            key={item.id}
                            {...item}
                            btn1='Rate'
                            btn2='Re-Order'
                            display='flex'
                        />
                    ))}
                </ScrollView>
            )}
        </BoundaryScreen>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: '600',
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomWidth: 2,
        borderBottomColor: '#CED7DF',
    },
    btn: {
        width: 150,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
        bottom: -1.75,
    },
})