import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { Provider } from 'react-redux'
import store from './src/store'

import MenuProfile from './src/screens/MenuProfile'
import Welcome from './src/screens/Welcome'
import Notification from './src/screens/Notification'
import PersonalInfo from './src/screens/PersonalInfo'
import EditInformation from './src/screens/PersonalInfo/EditInformation'
import SignIn from './src/screens/auth/SignIn'
import SignUp from './src/screens/auth/SignUp'
import BottomTabs from './src/screens/Tabs/BottomTabs'
import Search from './src/screens/Search'

const Stack = createNativeStackNavigator()

function App() {
    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName='Search'
                        screenOptions={{ headerShown: false }}
                    >
                        <Stack.Screen name='Welcome' component={Welcome} />
                        <Stack.Screen
                            name='MenuProfile'
                            component={MenuProfile}
                        />
                        <Stack.Screen
                            name='PersonalInfo'
                            component={PersonalInfo}
                        />
                        <Stack.Screen
                            name='EditInformation'
                            component={EditInformation}
                        />
                        <Stack.Screen
                            name='Notification'
                            component={Notification}
                        />
                        <Stack.Screen name='SignIn' component={SignIn} />
                        <Stack.Screen name='SignUp' component={SignUp} />
                        <Stack.Screen
                            name='BottomTabs'
                            component={BottomTabs}
                        />
                        <Stack.Screen name='Search' component={Search} />
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
        </SafeAreaProvider>
    )
}

export default App
