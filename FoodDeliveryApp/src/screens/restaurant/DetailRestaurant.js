import { useNavigation } from '@react-navigation/native'
import { Button, Text, View } from 'react-native'

const DetailRestaurant = () => {
    const navigation = useNavigation()

    const handleGoBack = () => {
        navigation.goBack()
    }

    return (
        <View
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
            }}
        >
            <Text>Detail restaurant screen</Text>
            <Button title='go back' onPress={handleGoBack} />
        </View>
    )
}

export default DetailRestaurant
