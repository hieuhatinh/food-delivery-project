import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View, Alert, Image } from 'react-native'
import Checkbox from 'expo-checkbox'
import { useDispatch, useSelector } from 'react-redux'

import Button from '../components/button/Button'
import MealItemInCart from './components/MealItemInCart'
import BoundaryScreen from '../components/BoundaryScreen'
import HeaderSecondary from '../components/header/HeaderSecondary'
import { global } from '../global'

import { resetTypeFetch, setSelectAll } from '../store/slice/cartSlice'
import { selectIdCart } from '../store/selector/userSelector'
import { selectCart, selectMealsChecked, selectorTotalPrice } from '../store/selector/cartSelector'
import Loading from '../components/Loading'
import { fetchGetAllMealsInCart } from '../store/actions/cartAction'
import screenName from './config/screenName'
import { setMealsOrder, setTotalPrice } from '../store/slice/orderSlice'

export default function Cart({ navigation }) {
    const dispatch = useDispatch()
    const totalPrice = useSelector(selectorTotalPrice)
    const idCart = useSelector(selectIdCart)
    const { isLoading, error, isSuccess, mealsInCart, typeFetch } =
        useSelector(selectCart)
    const mealsChecked = useSelector(selectMealsChecked)
    let { isCheckedAll, meals } = mealsInCart

    // xử lý check all
    const handleSelectAll = () => {
        dispatch(setSelectAll(!isCheckedAll))
    }

    // lấy thông tin món ăn có trong giỏ hàng
    useEffect(() => {
        dispatch(fetchGetAllMealsInCart({ idCart }))
        dispatch(resetTypeFetch())
    }, [typeFetch])

    // hiển thị lỗi
    useEffect(() => {
        if (error.isError) {
            Alert.alert('Lỗi', error.message, [
                {
                    text: 'Ok',
                    onPress: () => navigation.replace(screenName.bottomTabs),
                    style: 'destructive',
                },
            ])
        }
    }, [error])

    const handlePressPurchase = () => {
        if (mealsChecked.length < 1) {
            Alert.alert('Thông báo', 'Bạn cần chọn món để thực hiện thao tác tiếp theo', [
                {
                    text: 'Ok',
                    style: 'default',
                },
            ])
        } else {
            dispatch(setMealsOrder(mealsChecked))
            dispatch(setTotalPrice(totalPrice))
            navigation.navigate(screenName.payment)
        }
    }

    return (
        <BoundaryScreen>
            <HeaderSecondary iconLeft={false} title='Cart' />

            {isLoading ? (
                <React.Fragment>
                    <Loading />
                    <View style={{ width: '100%', height: '100%', flex: 1 }} />
                </React.Fragment>
            ) : meals.length === 0 ? (
                <View style={styles.viewEmptyCart}>
                    <Image
                        source={require('../assets/images/empty-cart.png')}
                        style={styles.imageEmptyCart}
                    />
                    <Text style={styles.textEmpty}>Giỏ hàng trống</Text>
                </View>
            ) : (
                <ScrollView
                    contentContainerStyle={{ alignItems: 'center' }}
                    style={{ width: '100%' }}
                >
                    {meals.map((item) => (
                        <MealItemInCart
                            key={item.mealId._id + item.size + item.quantity}
                            {...item}
                        />
                    ))}
                </ScrollView>
            )}
            <View style={styles.footer}>
                <View style={styles.viewCheckboxAndTotal}>
                    <View style={styles.viewCheckbox}>
                        <Checkbox
                            value={isCheckedAll}
                            onValueChange={handleSelectAll}
                        />
                        <Text style={styles.selectAll}>Chọn tất cả</Text>
                    </View>
                    <View style={styles.total}>
                        <Text>TOTAl: </Text>
                        <Text style={styles.totalPrice}>{totalPrice || 0}</Text>
                    </View>
                </View>
                <Button
                    height={50}
                    title='Mua hàng'
                    handlePress={handlePressPurchase}
                    disabled={isLoading || meals.length === 0}
                />
            </View>
        </BoundaryScreen>
    )
}

const styles = StyleSheet.create({
    flatlist: {
        width: '100%',
    },
    footer: {
        backgroundColor: '#f0f5fa',
        padding: 20,
        width: '100%',
        position: 'relative',
        bottom: 0,
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

    // empty cart
    viewEmptyCart: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageEmptyCart: {
        height: 200,
        width: 200,
    },
    textEmpty: {
        fontSize: 18,
        color: global.error,
        fontWeight: '500',
    },
})
