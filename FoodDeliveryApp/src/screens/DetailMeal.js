import { useNavigation } from '@react-navigation/native'
import { Button, View, Text } from 'react-native'

const DetailMeal = () => {
    const navigation = useNavigation()

    return (
        <View
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
            }}
        >
            <Text>Detail meal screen</Text>
            <Button title='Go Back' onPress={() => navigation.goBack()} />
        </View>
    )
}

export default DetailMeal
