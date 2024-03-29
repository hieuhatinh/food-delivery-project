import { Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Home from '../../components/icon/Home'

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

function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
                tabBarActiveTintColor: '#e91e63',
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
                        <Icon name='border-all' size={size} color={color} />
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

export default function App() {
    return (
        <MyTabs />
    )
}
