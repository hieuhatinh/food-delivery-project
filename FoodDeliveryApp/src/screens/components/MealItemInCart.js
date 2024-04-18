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
import { useDispatch, useSelector } from 'react-redux'

import { global } from '../../global'
import { setQuantityMeal, setSelectItem } from '../../store/slice/cartSlice'
import useDebounce from '../../hooks/useDebounce'
import {
    fetchDeleteMeal,
    fetchUpdateQuantity,
} from '../../store/actions/cartAction'
import { selectIdCart } from '../../store/selector/userSelector'

export default function MealItemInCart(props) {
    const dispatch = useDispatch()
    const idCart = useSelector(selectIdCart)

    const [isPress, setIsPress] = useState(false)

    let { mealId, size, quantity, isChecked } = props

    let price = mealId.priceAndSize
        .find((item) => item.size === size)
        .price.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
        })

    useDebounce(quantity, 1000, () => {
        if (isPress) {
            dispatch(
                fetchUpdateQuantity({
                    idCart,
                    idMeal: mealId._id,
                    quantity,
                    size,
                    typeFetch: 'updateQuantity',
                }),
            )

            setIsPress(false)
        }
    })

    const onClickPlus = () => {
        setIsPress(true)
        dispatch(
            setQuantityMeal({
                _id: mealId._id,
                quantity: quantity + 1,
            }),
        )
    }

    const onClickMinus = () => {
        setIsPress(true)
        if (quantity > 1) {
            dispatch(
                setQuantityMeal({
                    _id: mealId._id,
                    quantity: quantity - 1,
                }),
            )
        }
    }

    const handleCheckedItem = () => {
        dispatch(
            setSelectItem({
                _id: mealId._id,
                isChecked: !isChecked,
            }),
        )
    }

    const removeItem = () => {
        dispatch(
            fetchDeleteMeal({
                idMeal: mealId._id,
                idCart,
                typeFetch: 'removeItem',
            }),
        )
    }

    const handleMoveToTrash = () => {
        Alert.alert(
            'Cảnh báo',
            'Bạn có chắc chắn muốn xóa món ăn này khỏi giỏ hàng?',
            [
                {
                    text: 'Chắc chắn',
                    onPress: removeItem,
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
                    onValueChange={handleCheckedItem}
                    style={styles.checkbox}
                />
                <View style={styles.orderBox}>
                    <Image
                        source={{ uri: mealId.artwork.path }}
                        style={styles.image}
                    />
                    <View style={styles.viewInfo}>
                        <View>
                            <Text style={styles.nameFood} numberOfLines={2}>
                                {mealId.foodName}
                            </Text>
                            <Text style={styles.price}>{price}</Text>
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
        width: '90%'
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
        // flexWrap: 'wrap',
        width: '90%'
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
