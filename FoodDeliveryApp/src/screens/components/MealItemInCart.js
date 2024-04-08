import React, { useState } from 'react'
import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import Checkbox from 'expo-checkbox'

import { global } from '../../global'

export default function MealItemInCart({ nameFood, price, image, number }) {
    const [quantity, setQuantity] = useState(number)
    const [isChecked, setIsChecked] = useState(false)

    const onClickPlus = () => {
        setQuantity(quantity + 1)
    }
    const onClickMinus = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const handleChecked = () => {
        setIsChecked(!isChecked)
    }

    const handleMoveToTrash = () => {
        Alert.alert(
            'Cảnh báo',
            'Bạn có chắc chắn muốn xóa món ăn này khỏi giỏ hàng?',
            [
                {
                    text: 'Chắc chắn',
                    onPress: () => console.log('sure'),
                    style: 'destructive',
                },
                {
                    text: 'Huỷ',
                    style: 'cancel',
                },
            ],
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.viewLeft}>
                <Checkbox
                    value={isChecked}
                    onValueChange={handleChecked}
                    style={styles.checkbox}
                />
                <View style={styles.orderBox}>
                    <Image source={image} style={styles.image} />
                    <View style={styles.viewInfo}>
                        <View>
                            <Text style={styles.nameFood}>{nameFood}</Text>
                            <Text style={styles.price}>${price}</Text>
                        </View>
                        <View style={styles.viewNumberMeal}>
                            <View style={styles.icon}>
                                <Icon
                                    name='minus'
                                    size={20}
                                    onPress={onClickMinus}
                                />
                            </View>
                            <Text style={{ paddingHorizontal: 20 }}>
                                {quantity}
                            </Text>
                            <View style={styles.icon}>
                                <Icon
                                    name='plus'
                                    size={20}
                                    onPress={onClickPlus}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <TouchableOpacity activeOpacity={0.8} onPress={handleMoveToTrash}>
                <Icon name='trash' size={24} color={global.thirdColor} />
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 10,
        width: '95%',
        padding: 10,
    },
    viewLeft: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    checkbox: {
        height: 20,
        width: 20,
    },
    orderBox: {
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    image: {
        width: 120,
        height: 100,
        borderRadius: 20,
    },
    viewInfo: {
        marginLeft: 20,
        justifyContent: 'space-between',
    },
    nameFood: {
        fontSize: 18,
        flexWrap: 'wrap',
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
    },
    viewNumberMeal: {
        flexDirection: 'row',
    },
    icon: {
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: global.fourthColor,
        borderRadius: 100,
    },
})
