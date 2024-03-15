import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import home from './screens/home'
import Account from './screens/Account'
import My_Button from './components/My_Button'
const Stack = createStackNavigator()

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator intitialRouteName='home' screenOptions = {{ headerShown:false}}>
                <Stack.Screen name= "home" component = {home} />
                <Stack.Screen name= "Account" component = {Account} />
            </Stack.Navigator>
        </NavigationContainer>
       
    )
}



