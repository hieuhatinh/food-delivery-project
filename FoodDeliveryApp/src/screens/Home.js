import { useNavigation } from '@react-navigation/core'
import { Button, Text, View } from 'react-native'

const Home = () => {
    const navigation = useNavigation()

    return (
        <View
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
            }}
        >
            <Text>Home Screen</Text>
            <Button
                title='Go back SignIn'
                onPress={() => navigation.navigate('SignIn')}
            />
            <Button
                title='Go to MenuProfile'
                onPress={() => navigation.navigate('MenuProfile')}
            />
        </View>
    )
}

export default Home
