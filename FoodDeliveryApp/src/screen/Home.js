import { useNavigation } from '@react-navigation/core'
import { Button, Text, View } from 'react-native'

import storage from '../storage'

const Home = () => {
    const navigation = useNavigation()

    storage
        .load({
            key: 'user',
            id: '1',
        })
        .then((res) => console.log(res))

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
        </View>
    )
}

export default Home