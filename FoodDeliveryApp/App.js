import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { Provider } from 'react-redux'
import store from './src/store'

import { screens } from './src/screens/config'
import screenName from './src/screens/config/screenName'

const Stack = createNativeStackNavigator()

// màn order => còn lỗi
// nghiên cứu loading khi mới vào màn hình order, cart, categories, openres
// nghieen cứu loadmore ở màn hình restaurant view

function App() {
    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName={screenName.welcome}
                        screenOptions={{ headerShown: false }}
                    >
                        {screens.map((screen) => (
                            <Stack.Screen
                                key={screen.name}
                                name={screen.name}
                                component={screen.component}
                            />
                        ))}
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
        </SafeAreaProvider>
    )
}

export default App
