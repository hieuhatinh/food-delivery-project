import React, { useEffect } from 'react'
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Alert,
    FlatList,
    ActivityIndicator,
} from 'react-native'
import Checkbox from 'expo-checkbox'
import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'

import Button from '../components/button/Button'
import MealItemInCart from './components/MealItemInCart'
import BoundaryScreen from '../components/BoundaryScreen'
import HeaderSecondary from '../components/header/HeaderSecondary'
import { global } from '../global'
import Loading from '../components/Loading'
import NoneValuesNotify from '../components/NoneValuesNotify'

import {
    reStopLoadMore,
    resetTypeFetch,
    setSelectAll,
} from '../store/slice/cartSlice'
import { selectIdCart } from '../store/selector/userSelector'
import {
    selectCart,
    selectMealsChecked,
    selectorTotalPrice,
} from '../store/selector/cartSelector'
import {
    fetchLoadMoreGetAllMealsInCart,
    fetchRefreshGetAllMealsInCart,
} from '../store/actions/cartAction'
import screenName from './config/screenName'
import { setMealsOrder, setTotalPrice } from '../store/slice/orderSlice'
import { limit, typeLoadMore, typeRefresh } from '../utils/configLoadData'

export default function Cart({ navigation }) {
    const isFocused = useIsFocused()

    const dispatch = useDispatch()
    const totalPrice = useSelector(selectorTotalPrice)
    const idCart = useSelector(selectIdCart)
    const {
        isLoading,
        error,
        isSuccess,
        mealsInCart,
        typeFetch,
        isStopLoadMore,
    } = useSelector(selectCart)
    const mealsChecked = useSelector(selectMealsChecked)
    let { isCheckedAll, meals } = mealsInCart

    // xử lý check all
    const handleSelectAll = () => {
        dispatch(setSelectAll(!isCheckedAll))
    }

    // xử lý lấy thông tin các món ăn có trong giỏ hàng
    const handleGetData = (type) => {
        if (type === typeRefresh) {
            dispatch(reStopLoadMore())
            dispatch(
                fetchRefreshGetAllMealsInCart({
                    idCart,
                    limit,
                }),
            )
        }

        if (!isStopLoadMore && type === typeLoadMore) {
            dispatch(
                fetchLoadMoreGetAllMealsInCart({
                    idCart,
                    limit,
                    skip: meals.length,
                }),
            )
        }
        // dispatch(resetTypeFetch())
    }

    useEffect(() => {
        if (isFocused) {
            handleGetData(typeRefresh)
        }
    }, [isFocused, typeFetch])

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
            Alert.alert(
                'Thông báo',
                'Bạn cần chọn món để thực hiện thao tác tiếp theo',
                [
                    {
                        text: 'Ok',
                        style: 'default',
                    },
                ],
            )
        } else {
            dispatch(setMealsOrder(mealsChecked))
            dispatch(setTotalPrice(totalPrice))
            navigation.navigate(screenName.payment)
        }
    }

    return (
        <BoundaryScreen>
            <HeaderSecondary iconLeft={false} title='Cart' />

            {meals.length === 0 ? (
                <NoneValuesNotify
                    image={require('../assets/images/empty-cart.png')}
                    textNotify='Giỏ hàng trống'
                />
            ) : (
                <FlatList
                    data={meals}
                    renderItem={({ item }) => <MealItemInCart {...item} />}
                    keyExtractor={(item) =>
                        item.mealId._id + item.size + item.quantity
                    }
                    numColumns={1}
                    onEndReachedThreshold={0.2}
                    onEndReached={() => handleGetData(typeLoadMore)}
                    ListFooterComponent={
                        !isStopLoadMore && (
                            <ActivityIndicator
                                color={'red'}
                                style={{ paddingBottom: 20 }}
                            />
                        )
                    }
                />
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
                    disabled={meals.length === 0}
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
})
