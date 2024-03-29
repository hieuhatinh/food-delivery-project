import { Image, StyleSheet, View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

export default function suggestedRestaurants({ restaurant, rate, image }) {
    return (
        <View style={styles.suggestedRestaurants}>
            <Image source={image} style={styles.imgRestaurants} />
            <View style={styles.pdImage}>
                <Text>{restaurant}</Text>
                <View style={styles.rate}>
                    <Icon name='star' size={20} />
                    <Text> {rate}</Text>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    suggestedRestaurants: {
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderColor: '#98A8B8',
    },
    imgRestaurants: {
        width: 60,
        height: 50,
        borderRadius: 10,
    },
    rate: {
        flexDirection: 'row',
        paddingTop: 10,
    },
    pdImage: {
        paddingLeft: 20,
    },
})
