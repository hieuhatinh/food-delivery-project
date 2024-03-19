import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SignIn from './src/screen/auth/SignIn'
import SignUp from './src/screen/auth/SignUp'
import Home from './src/screen/Home'

const Stack = createNativeStackNavigator()

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='SignIn'
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name='SignIn' component={SignIn} />
                <Stack.Screen name='SignUp' component={SignUp} />
                <Stack.Screen name='Home' component={Home} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default App