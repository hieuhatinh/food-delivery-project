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
import ResultByName from './src/screens/Search/ResultByName'
import DetailRestaurant from './src/screens/restaurant/DetailRestaurant'
import OpenRestaurants from './src/screens/restaurant/OpenRestaurants'
import DetailMeal from './src/screens/DetailMeal'
import MyCart2 from './src/screens/MyCart2'
import EditAddressAndContact from './src/screens/EditAddressAndContact'

const Stack = createNativeStackNavigator()

function App() {
    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName='MyCart2'
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

                        {/* restaurant */}
                        <Stack.Screen
                            name='OpenRestaurants'
                            component={OpenRestaurants}
                        />
                        <Stack.Screen
                            name='DetailRestaurant'
                            component={DetailRestaurant}
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

                        {/* meal */}
                        <Stack.Screen
                            name='DetailMeal'
                            component={DetailMeal}
                        />

                        <Stack.Screen name='MyCart2' component={MyCart2} />
                        <Stack.Screen name='EditAddressAndContact' component={EditAddressAndContact} />
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
        </SafeAreaProvider>
    )
}

export default App


