import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Rate from '../Rate'

const CardRestaurant = (props) => {
    const navigation = useNavigation()

    const handlePress = () => {
        navigation.navigate('RestaurantView', { idRestaurant: props._id })
    }

    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.9}
            onPress={handlePress}
        >
            <Image
                source={{ uri: props.imageURI }}
                resizeMode='cover'
                style={styles.image}
            />
            <Text style={styles.restaurantName} numberOfLines={1}>
                {props.restaurantName}
            </Text>
            <Text style={styles.categories} numberOfLines={1}>
                {props.categories}
            </Text>

            <Rate />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
        gap: 8,
    },
    image: {
        width: '100%',
        height: 140,
        borderRadius: 10,
    },
    restaurantName: {
        fontSize: 16,
        textTransform: 'capitalize',
    },
    categories: {
        fontSize: 14,
        color: '#a0a5ba',
    },
})

export default CardRestaurant
