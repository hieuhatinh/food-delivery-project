import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome6'
import { useNavigation } from '@react-navigation/native'

import { global } from '../../global'

const CardRestaurant = (props) => {
    const navigation = useNavigation()

    const handlePress = () => {
        navigation.navigate('DetailRestaurant')
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
            <View style={styles.footer_Icon}>
                <View style={styles.info}>
                    <Icon name='star' color={global.primaryColor} size={20} />
                    <Text>4.7</Text>
                </View>
                <View style={styles.info}>
                    <Icon
                        name='truck-fast'
                        color={global.primaryColor}
                        size={20}
                    />
                    <Text>Free</Text>
                </View>
                <View style={styles.info}>
                    <Icon name='clock' color={global.primaryColor} size={20} />
                    <Text>20 min</Text>
                </View>
            </View>
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
    footer_Icon: {
        flexDirection: 'row',
        gap: 30,
        marginTop: 10,
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
})

export default CardRestaurant
