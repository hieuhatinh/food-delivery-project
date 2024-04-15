import { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Entypo'
import { useDispatch, useSelector } from 'react-redux'

import { global } from '../../global'
import Home from '../Home'
import MenuProfile from '../MenuProfile'
import Cart from '../Cart'
import MyOrder from '../MyOrder'

import { selectIdCart } from '../../store/selector/userSelector'
import { selectNumberMeals } from '../../store/selector/cartSelector'
import { fetchCountQuantity } from '../../store/actions/cartAction'

const Tab = createBottomTabNavigator()

export default function BottomTabs() {
    const dispatch = useDispatch()
    const idCart = useSelector(selectIdCart)
    const numberMeals = useSelector(selectNumberMeals)

    useEffect(() => {
        dispatch(fetchCountQuantity({ idCart }))
    }, [])

    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
                tabBarActiveTintColor: global.primaryColor,
                headerShown: false,
            }}
        >
            <Tab.Screen
                name='Home'
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name='home' size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name='Order'
                component={MyOrder}
                options={{
                    tabBarLabel: 'Order',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name='text-document' size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name='Cart'
                component={Cart}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <View>
                            <Icon
                                name='shopping-cart'
                                size={size}
                                color={color}
                            />
                            <View style={styles.viewNumber}>
                                <Text style={styles.number}>{numberMeals}</Text>
                            </View>
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name='MenuProfile'
                component={MenuProfile}
                options={{
                    tabBarLabel: 'Menu',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name='menu' size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    viewCartNotify: {},
    viewNumber: {
        position: 'absolute',
        top: -10,
        right: -10,
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: global.fourthColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    number: {
        color: global.primaryColor,
        fontWeight: '500',
    },
})
