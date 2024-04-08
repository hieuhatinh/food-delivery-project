import { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Checkbox from 'expo-checkbox'

import Button from '../components/button/Button'
import MealItemInCart from './components/MealItemInCart'
import BoundaryScreen from '../components/BoundaryScreen'
import HeaderSecondary from '../components/header/HeaderSecondary'
import { global } from '../global'

const data = [
    {
        id: 1,
        image: require('../assets/images/avatar.png'),
        number: 1,
        nameFood: 'Phở bò',
        price: 30,
    },
    {
        id: 2,
        image: require('../assets/images/avatar.png'),
        number: 1,
        nameFood: 'Phở bò',
        price: 30,
    },
    {
        id: 3,
        image: require('../assets/images/avatar.png'),
        number: 1,
        nameFood: 'Phở bò',
        price: 30,
    },
    {
        id: 4,
        image: require('../assets/images/avatar.png'),
        number: 1,
        nameFood: 'Phở bò',
        price: 30,
    },
    {
        id: 5,
        image: require('../assets/images/avatar.png'),
        number: 1,
        nameFood: 'Phở bò',
        price: 30,
    },
]
export default function Cart({ navigation }) {
    const [isSelectAll, setIsSelectAll] = useState(false)
    var sumPrice = 0

    data.forEach((item) => (sumPrice += item.price * item.number))

    const handleSelectAll = () => {
        setIsSelectAll(!isSelectAll)
    }

    return (
        <BoundaryScreen>
            <HeaderSecondary>
                <Text style={styles.title}>Cart</Text>
            </HeaderSecondary>
            <ScrollView
                contentContainerStyle={{ alignItems: 'center' }}
                style={{ width: '100%' }}
            >
                {data.map((item) => (
                    <MealItemInCart key={item.id} {...item} />
                ))}
            </ScrollView>
            <View style={styles.footer}>
                <View style={styles.viewCheckboxAndTotal}>
                    <View style={styles.viewCheckbox}>
                        <Checkbox
                            value={isSelectAll}
                            onValueChange={handleSelectAll}
                        />
                        <Text style={styles.selectAll}>Chọn tất cả</Text>
                    </View>
                    <View style={styles.total}>
                        <Text>TOTAl: </Text>
                        <Text style={styles.totalPrice}> $ {sumPrice}</Text>
                    </View>
                </View>
                <Button
                    height={50}
                    title={'PLACE ORDER'}
                    handlePress={() => navigation.navigate('OrderSuccess')}
                />
            </View>
        </BoundaryScreen>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: '600',
    },
    flatlist: {
        width: '100%',
    },
    footer: {
        backgroundColor: '#f0f5fa',
        padding: 20,
        width: '100%',
    },
    viewCheckboxAndTotal: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    viewCheckbox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectAll: {
        marginLeft: 5,
        fontSize: 14,
        color: global.textPrimaryColor,
    },
    total: {
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    totalPrice: {
        fontSize: 20,
        fontWeight: '500',
    },
})
