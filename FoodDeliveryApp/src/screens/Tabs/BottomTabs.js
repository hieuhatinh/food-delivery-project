import { Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Entypo'
import Home from '../Home'
import { global } from '../../global'

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

function Account() {
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text>Account!</Text>
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
                name='Account'
                component={Account}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Account',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name='user' size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}
