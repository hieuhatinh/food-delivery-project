import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import BoundaryIcon from '../components/button/BoundaryIcon'
import Icon from 'react-native-vector-icons/Entypo'
import { useState } from 'react'
import Button from '../components/button/Button'
import Order from './components/Order'
import { global } from '../global'

export default function PlaceOrder({ navigation }) {
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

    const [edit, isEdit] = useState(false)
    const [address, setAddress] = useState('ĐHXD')
    var sumPrice = 0

    const editAddress = () => {
        isEdit(!edit)
    }
    data.forEach((item) =>(
        sumPrice += item.price * item.number
    ))
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.boxBtn}>
                    <BoundaryIcon handlePress={() => console.log('hihi')}>
                        <Icon name='chevron-left' size={20} />
                    </BoundaryIcon>
                    <Text style={styles.text1}>Cart</Text>
                </View>
            </View>
            <ScrollView>
                {data.map((item) => (
                            <Order key={item.id} {...item} />
                        ))}
            </ScrollView>
            <View style={styles.footer}>
                <View style={styles.address}>
                    <Text>DELIVERY ADDERSS</Text>
                    <TouchableOpacity onPress={editAddress}>
                        <Text style ={[{textDecorationLine: 'underline'}, styles.colorText]}>EDIT</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TextInput
                        value={address}
                        editable={edit}
                        onChangeText={(value) => setAddress(value)}
                    />
                </View>
                <View style={styles.address}>
                    <Text>Payment Method</Text>
                    <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Payment_Info')}>
                        <View style={styles.cash}>
                            <Text style = {styles.colorText}>Cash</Text>
                            <Icon name='chevron-small-right' size={20} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.address}>
                    <View style={[styles.row, { alignItems: 'center' }]}>
                        <Text>TOTAl: </Text>
                        <Text style={styles.totalPrice}> $ {sumPrice}</Text>
                    </View>
                    <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Payment_Info')}>
                        <View style={styles.cash}>
                            <Text style = {styles.colorText}>Breakdown</Text>
                            <Icon name='chevron-small-right' size={20} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.widthBtn}>
                    <Button
                        height={50}
                        title={'PLACE ORDER'}
                        handlePress={() => navigation.navigate('OrderSuccess')}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: 50,
        paddingLeft: 20,
    },
    boxBtn: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text1: {
        fontSize: 17,
        paddingLeft: 15,
    },
    footer: {
        backgroundColor: '#f0f5fa',
        paddingHorizontal: 20,
    },
    row: {
        flexDirection: 'row',
    },
    address: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        alignItems: 'center',
    },
    cash: {
        flexDirection: 'row',
        width: 95,
        justifyContent: 'space-between',
    },
    widthBtn: {
        width: '105%',
        paddingBottom: 10,
    },
    totalPrice: {
        fontSize: 30,
    },
    colorText: {
        color: global.primaryColor
    }
})
