import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { global } from '../../global'

export default function SuggestRestaurants({ restaurant, rate, image }) {
    return (
        <TouchableOpacity
            style={styles.suggestedRestaurants}
            activeOpacity={0.8}
        >
            <Image source={image} style={styles.imgRestaurants} />
            <View style={styles.pdImage}>
                <Text style={styles.restaurantName}>{restaurant}</Text>
                <View style={styles.rate}>
                    <Icon name='star' size={15} color={global.primaryColor} />
                    <Text> {rate}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    suggestedRestaurants: {
        flexDirection: 'row',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderColor: '#ebebeb',
    },
    imgRestaurants: {
        width: 60,
        height: 50,
        borderRadius: 10,
    },
    rate: {
        flexDirection: 'row',
        paddingTop: 10,
        alignItems: 'center',
    },
    pdImage: {
        paddingLeft: 20,
    },
    restaurantName: {
        fontSize: 16,
    },
})
