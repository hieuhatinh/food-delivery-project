import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { Provider } from 'react-redux'
import store from './src/store'

import SignIn from './src/screens/auth/SignIn'
import Food_Details from './src/screens/Food_Details'
import RestaurantView from './src/screens/restaurant/Restaurant_View'

const Stack = createNativeStackNavigator()

function App() {
    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName='RestaurantView'
                        screenOptions={{ headerShown: false }}
                    >
                        <Stack.Screen
                            name='Food_Details'
                            component={Food_Details}
                        />
                        <Stack.Screen
                            name='RestaurantView'
                            component={RestaurantView}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
        </SafeAreaProvider>
    )
}

export default App
