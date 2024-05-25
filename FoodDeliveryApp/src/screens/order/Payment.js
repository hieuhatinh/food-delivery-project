import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import React, { useEffect } from 'react'
import Icon from 'react-native-vector-icons/Entypo'
import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'

import Button from '../../components/button/Button'
import OrderInformation from '../components/OrderInformation'
import BoundaryScreen from '../../components/BoundaryScreen'
import HeaderSecondary from '../../components/header/HeaderSecondary'
import screenName from '../config/screenName'
import Loading from '../../components/Loading'
import { global } from '../../global'

import { selectOrder, selectMeals } from '../../store/selector/orderSelector'
import { selectAddressDeliveryCurrent } from '../../store/selector/deliveryAddressSelector'
import { fetchGetDefaultAddress } from '../../store/actions/deliveryAddressAction'
import { reAddressDelivery } from '../../store/slice/deliveryAddressSlice'
import { fetchCreateNewOrder } from '../../store/actions/orderAction'
import { reState } from '../../store/slice/orderSlice'
import { fetchDeleteManyMeals } from '../../store/actions/cartAction'
import { selectIdCart } from '../../store/selector/userSelector'
import typeFetch from '../../utils/typeFetch'

export default function Payment({ navigation }) {
    const isFocused = useIsFocused()
    const dispatch = useDispatch()

    const mealsOrderWithPriceString = useSelector(selectMeals)
    const {
        totalPrice,
        mealsOrder,
        isLoading,
        isError,
        isSuccess,
        messageNotify,
    } = useSelector(selectOrder)
    const addressDeliveryCurrent = useSelector(selectAddressDeliveryCurrent)
    const idCart = useSelector(selectIdCart)

    const handleNavigateEditInfo = () => {
        if (!addressDeliveryCurrent) {
            Alert.alert('Thông báo', 'Chưa có địa chỉ giao hàng')
        } else {
            dispatch(
                fetchCreateNewOrder({
                    meals: mealsOrder,
                    ...addressDeliveryCurrent,
                }),
            )
        }
    }

    const hanldeChangePaymentMethod = () => {
        navigation.navigate(screenName.paymentInfo)
    }

    const handleChangeDeliveryInfo = () => {
        navigation.navigate(screenName.deliveryAddresses)
    }

    // lấy địa chỉ mặc định
    useEffect(() => {
        if (!addressDeliveryCurrent) {
            dispatch(fetchGetDefaultAddress())
        }
    }, [addressDeliveryCurrent])

    const handlePressBack = () => {
        dispatch(reAddressDelivery())
        navigation.goBack()
    }

    useEffect(() => {
        if (isFocused) dispatch(reState())
    }, [isFocused])

    // xử lý thông báo
    useEffect(() => {
        if (isSuccess) {
            Alert.alert('Thông báo', messageNotify, [
                {
                    text: 'Tuyệt vời ông mặt trời',
                    onPress: () => {
                        // dispatch(reState())
                        dispatch(
                            fetchDeleteManyMeals({
                                idCart,
                                mealsOrder,
                                typeFetch: typeFetch.deleteMany,
                            }),
                        ),
                            navigation.navigate(screenName.orderSuccess)
                    },
                },
            ])
        }

        if (isError) {
            Alert.alert('Lỗi', messageNotify, [
                {
                    text: 'Thật đáng tiếc',
                    onPress: () => navigation.goBack(),
                },
            ])
        }
    }, [isSuccess, isError])

    return (
        <BoundaryScreen style={styles.container}>
            <HeaderSecondary
                iconRightSecond={{
                    name: 'dots-three-horizontal',
                }}
                title='Thanh toán'
                handlePressBack={handlePressBack}
            />
            {isLoading && <Loading />}

            <View style={styles.colBox}>
                <TouchableOpacity
                    style={styles.boxAddress}
                    onPress={handleChangeDeliveryInfo}
                    activeOpacity={0.8}
                >
                    <Text style={{ paddingBottom: 15 }}>DELIVERY ADDRESS</Text>
                    {!!addressDeliveryCurrent ? (
                        <View style={styles.info}>
                            <View style={styles.viewNamePhone}>
                                <Text style={styles.name}>
                                    {addressDeliveryCurrent.recipientName}
                                </Text>
                                <Text>
                                    {addressDeliveryCurrent.contactPhoneNumber}
                                </Text>
                            </View>
                            <Text>
                                {addressDeliveryCurrent.deliveryAddress}
                            </Text>
                        </View>
                    ) : (
                        <Text style={styles.none}>None</Text>
                    )}
                    <Icon
                        name='chevron-thin-right'
                        size={20}
                        style={styles.icons}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.boxPayment}>
                <Text>Payment Method</Text>
                <TouchableOpacity
                    style={{ flexDirection: 'row', paddingRight: 25 }}
                    onPress={hanldeChangePaymentMethod}
                    activeOpacity={0.8}
                >
                    <Text style={styles.title2}>Cash</Text>
                    <Icon name='chevron-thin-right' size={20} />
                </TouchableOpacity>
            </View>
            <FlatList
                data={mealsOrderWithPriceString}
                renderItem={({ item }) => <OrderInformation {...item} />}
                keyExtractor={(item) => item.mealId + item.size + item.quantity}
            />

            <View style={styles.footer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.boxtotalPrice}>
                        <Text style={styles.titletotalPrice}> TOTAl: </Text>
                        <Text style={styles.totalPrice}>{totalPrice}</Text>
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
    info: {
        marginLeft: 10,
        gap: 5,
    },
    viewNamePhone: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        fontWeight: '600',
        marginRight: 10,
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
        paddingLeft: 10,
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
    none: {
        color: global.error,
    },
})
