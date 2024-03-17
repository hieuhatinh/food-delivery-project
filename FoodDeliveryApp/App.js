import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import MenuProfile from './src/screens/MenuProfile'
import Welcome from './src/screens/Welcome'
import Notification from './src/screens/Notification'

const Stack = createStackNavigator()

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                intitialRouteName='Welcome'
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name='HomeScreen' component={Welcome} />
                <Stack.Screen name='MenuProfile' component={MenuProfile} />
                <Stack.Screen name='Notification' component={Notification} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
