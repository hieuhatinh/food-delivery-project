import { Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Entypo'

import { global } from '../../global'
import Home from '../Home'
import MenuProfile from '../MenuProfile'

function Order() {
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text>Order!</Text>
        </View>
    )
}

function ShoppingCart() {
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text>Shopping Cart!</Text>
        </View>
    )
}

const Tab = createBottomTabNavigator()

export default function BottomTabs() {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
                tabBarActiveTintColor: global.primaryColor,
            }}
        >
            <Tab.Screen
                name='Home'
                component={Home}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name='home' size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name='Order'
                component={Order}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Order',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name='text-document' size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name='ShoppingCart'
                component={ShoppingCart}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Shopping Cart',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name='shopping-cart' size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name='MenuProfile'
                component={MenuProfile}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Menu',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name='menu' size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}
