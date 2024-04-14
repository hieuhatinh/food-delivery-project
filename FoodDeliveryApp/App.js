import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { Provider } from 'react-redux'
import store from './src/store'

import SignIn from './src/screens/auth/SignIn'
import SignUp from './src/screens/auth/SignUp'
import BottomTabs from './src/screens/Tabs/BottomTabs'
import AllCategories from './src/screens/AllCategories'
import Search from './src/screens/Search'
import ResultByCategory from './src/screens/Search/ResultByCategory'
import ResultByName from './src/screens/Search/ResultByName'
import OrderSuccess from './src/screens/OrderSuccess'
import Payment_Info from './src/screens/Payment_Info'
import OpenRestaurants from './src/screens/restaurant/OpenRestaurants'
import Food_Details from './src/screens/Food_Details'
import RestaurantView from './src/screens/restaurant/Restaurant_View'
import Welcome from './src/screens/Welcome'

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
                        <Stack.Screen name='Welcome' component={Welcome} />
                        <Stack.Screen name='SignIn' component={SignIn} />
                        <Stack.Screen name='SignUp' component={SignUp} />
                        <Stack.Screen name='BottomTabs' component={BottomTabs} />

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

                        {/* restaurant */}
                        <Stack.Screen
                            name='OpenRestaurants'
                            component={OpenRestaurants}
                        />
                        <Stack.Screen
                            name='RestaurantView'
                            component={RestaurantView}
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

                        <Stack.Screen
                            name='Food_Details'
                            component={Food_Details}
                        />

                        <Stack.Screen
                            name='OrderSuccess'
                            component={OrderSuccess}
                        />
                        <Stack.Screen
                            name='Payment_Info'
                            component={Payment_Info}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
        </SafeAreaProvider>
    )
}

export default App
