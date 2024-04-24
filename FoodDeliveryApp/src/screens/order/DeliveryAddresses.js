import { useEffect } from 'react'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { StyleSheet, FlatList, View, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import HeaderSecondary from '../../components/header/HeaderSecondary'
import BoundaryScreen from '../../components/BoundaryScreen'
import DeliveryItem from '../components/DeliveryItem'
import Button from '../../components/button/Button'
import screenName from '../config/screenName'
import Loading from '../../components/Loading'

import { selectDeliveryAddress } from '../../store/selector/deliveryAddressSelector'
import { fetchGetAllDeliveryAddress } from '../../store/actions/deliveryAddressAction'
import {
    reState,
    setDeliveryAddress,
} from '../../store/slice/deliveryAddressSlice'
import { methodFetch } from './EditAddressAndContact'
import NoneValuesNotify from '../../components/NoneValuesNotify'

const DeliveryAddresses = () => {
    const navigation = useNavigation()
    const isFocused = useIsFocused()
    const dispatch = useDispatch()
    const { isLoading, isSuccess, isError, messageNotify, addresses } =
        useSelector(selectDeliveryAddress)

    const handleAddNewAddress = () => {
        navigation.navigate(screenName.editAddressAndContact, {
            method: methodFetch.post,
        })
    }

    // xử lý chọn địa chỉ giao hàng
    const handleChooseThisAddress = () => {
        dispatch(setDeliveryAddress())
        navigation.goBack()
    }

    // xử lý gọi api lấy tất cả địa chỉ giao hàng
    useEffect(() => {
        if (isFocused === true) dispatch(fetchGetAllDeliveryAddress())
    }, [isFocused])

    // đặt lại trạng thái
    useEffect(() => {
        if (isFocused === true) dispatch(reState())
    }, [isSuccess, isFocused])

    // hiển thị lỗi
    useEffect(() => {
        if (isError) {
            Alert.alert('Lỗi', messageNotify, [
                {
                    text: 'Ok',
                    onPress: () => navigation.goBack(),
                },
            ])
        }
    }, [isError])

    return (
        <BoundaryScreen>
            <HeaderSecondary title='Chọn địa chỉ nhận hàng' />
            {isLoading ? (
                <Loading />
            ) : addresses.length < 1 ? (
                <NoneValuesNotify
                    image={require('../../assets/images/no-address.png')}
                    textNotify='Chưa có địa chỉ nhận hàng. Vui lòng thêm địa chỉ nhận hàng'
                />
            ) : (
                <FlatList
                    data={addresses}
                    renderItem={({ item }) => <DeliveryItem {...item} />}
                    keyExtractor={(item) => item._id}
                    numColumns={1}
                    showsVerticalScrollIndicator={false}
                    style={styles.flatlist}
                />
            )}

            <View style={{ width: '90%', paddingVertical: 10 }}>
                <Button
                    outline
                    title='Thêm địa chỉ nhận hàng'
                    handlePress={handleAddNewAddress}
                />
                <Button
                    title='Chọn địa chỉ này'
                    handlePress={handleChooseThisAddress}
                />
            </View>
        </BoundaryScreen>
    )
}

const styles = StyleSheet.create({
    flatlist: {
        width: '95%',
    },
})

export default DeliveryAddresses
