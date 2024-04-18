import { useEffect } from 'react'
import { StyleSheet, Text } from 'react-native'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'

import { global } from '../../global'
import BoundaryIcon from '../button/BoundaryIcon'

import { selectIdCart } from '../../store/selector/userSelector'
import {
    selectNumberMeals,
    selectTypeFetch,
} from '../../store/selector/cartSelector'
import { fetchCountQuantity } from '../../store/actions/cartAction'
import screenName from '../../screens/config/screenName'

const CartNotify = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const idCart = useSelector(selectIdCart)
    const numberMeals = useSelector(selectNumberMeals)
    const typeFetch = useSelector(selectTypeFetch)

    useEffect(() => {
        dispatch(fetchCountQuantity({ idCart }))
    }, [typeFetch])

    const handleNavigate = () => {
        navigation.navigate(screenName.bottomTabs, { screen: screenName.cart })
    }

    return (
        <BoundaryIcon handlePress={handleNavigate}>
            <Icon size={20} name='shopping-basket' />
            <View style={styles.viewNumber}>
                <Text style={styles.number}>{numberMeals}</Text>
            </View>
        </BoundaryIcon>
    )
}

const styles = StyleSheet.create({
    viewNumber: {
        top: 2,
        right: 2,
        borderRadius: 10,
        height: 20,
        width: 20,
        backgroundColor: global.primaryColor,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    number: {
        color: '#fff',
        fontSize: 12,
    },
})

export default CartNotify
