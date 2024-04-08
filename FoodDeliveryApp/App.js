import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { Provider } from 'react-redux'
import store from './src/store'

import Welcome from './src/screens/Welcome'
import Notification from './src/screens/Notification'
import PersonalInfo from './src/screens/PersonalInfo'
import EditInformation from './src/screens/PersonalInfo/EditInformation'
import SignIn from './src/screens/auth/SignIn'
import SignUp from './src/screens/auth/SignUp'
import BottomTabs from './src/screens/Tabs/BottomTabs'
import AllCategories from './src/screens/AllCategories'
import Search from './src/screens/Search'
import ResultByCategory from './src/screens/Search/ResultByCategory'
import OpenRestaurants from './src/screens/OpenRestaurants'
import ResultByName from './src/screens/Search/ResultByName'
import OrderSuccess from './src/screens/OrderSuccess'
import Payment_Info from './src/screens/Payment_Info'
import Cart from './src/screens/Cart'
import MyOrder from './src/screens/MyOrder'
const Stack = createNativeStackNavigator()

function App() {
    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName='MyOrder'
                        screenOptions={{ headerShown: false }}
                    >
                        <Stack.Screen name='Welcome' component={Welcome} />
                        <Stack.Screen name='SignIn' component={SignIn} />
                        <Stack.Screen name='SignUp' component={SignUp} />
                        <Stack.Screen
                            name='BottomTabs'
                            component={BottomTabs}
                        />

                        {/* Person infomation */}
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

                        <Stack.Screen
                            name='AllCategories'
                            component={AllCategories}
                        />
                        <Stack.Screen
                            name='OpenRestaurants'
                            component={OpenRestaurants}
                        />

                        {/* Search and result */}
                        <Stack.Screen name='Search' component={Search} />
                        <Stack.Screen
                            name='ResultByCategory'
                            component={ResultByCategory}
                        />
                        <Stack.Screen
                            name='ResultByName'
                            component={ResultByName}
                        />

                        <Stack.Screen name='Cart' component={Cart} />
                        <Stack.Screen
                            name='OrderSuccess'
                            component={OrderSuccess}
                        />
                        <Stack.Screen
                            name='Payment_Info'
                            component={Payment_Info}
                        />
                        <Stack.Screen name='MyOrder' component={MyOrder} />
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
        </SafeAreaProvider>
    )
}

export default App
