import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, TouchableOpacity, Button, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import { useDispatch, useSelector } from 'react-redux'

import { global } from '../../global'
import screenName from '../config/screenName'
import { setSelectedIdAddress } from '../../store/slice/deliveryAddressSlice'
import { selectIdAddress } from '../../store/selector/deliveryAddressSelector'
import { methodFetch } from '../order/EditAddressAndContact'

const DeliveryItem = (props) => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const selectedIdAddress = useSelector(selectIdAddress)

    const handleChangeInfo = () => {
        navigation.navigate(screenName.editAddressAndContact, {
            method: methodFetch.put,
            ...props,
        })
    }

    // xử lý chọn địa điểm giao hàng
    const handleChooseAddress = () => {
        dispatch(setSelectedIdAddress(props._id))
    }

    return (
        <TouchableOpacity
            style={[
                styles.viewAddressInfo,
                selectedIdAddress === props._id && styles.active,
            ]}
            activeOpacity={0.8}
            onPress={handleChooseAddress}
        >
            <Icon name='location-pin' size={30} color={global.primaryColor} />
            <View style={styles.info}>
                <View style={styles.viewNamePhone}>
                    <Text style={styles.name}>{props.recipientName}</Text>
                    <Text>{props.contactPhoneNumber}</Text>
                </View>
                <Text>{props.deliveryAddress}</Text>
                {props.isDefault && (
                    <Text style={styles.textDefault}>Mặc định</Text>
                )}
            </View>
            <Button
                title='Sửa'
                color={global.primaryColor}
                onPress={handleChangeInfo}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    viewAddressInfo: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        marginBottom: 20,
    },
    active: {
        borderColor: global.primaryColor,
        borderWidth: 1,
        borderRadius: 10,
    },
    info: {
        flex: 1,
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
    textDefault: {
        width: 75,
        flexWrap: 'nowrap',
        borderWidth: 1,
        borderColor: global.primaryColor,
        color: global.primaryColor,
        padding: 5,
    },
})

export default DeliveryItem
