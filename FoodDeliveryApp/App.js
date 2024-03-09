import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import PersonalInfo from './src/screen/PersonalInfo'
import EditInformation from './src/screen/PersonalInfo/EditInformation'

const Stack = createNativeStackNavigator()

function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='PersonalInfo'>
                    {/* <Stack.Group> */}
                    {/* <Stack.Screen
                        name='PersonalInfo'
                        component={PersonalInfo}
                        options={{ headerShown: false }}
                    /> */}
                    <Stack.Screen
                        name='EditInformation'
                        component={EditInformation}
                        options={{ headerShown: false }}
                    />
                    {/* </Stack.Group> */}
                    {/* <Stack.Group screenOptions={{ presentation: 'modal' }}>
                        <Stack.Screen
                            name='EditInformation'
                            component={EditInformation}
                            options={{ headerShown: false }}
                        />
                    </Stack.Group> */}
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    )
}

export default App
