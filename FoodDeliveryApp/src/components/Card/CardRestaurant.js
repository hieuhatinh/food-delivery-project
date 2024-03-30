import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { global } from '../../global'

export default function CardRestaurant({ restaurant, categories, image }) {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.9}>
            <View style={styles.restaurants}>
                <Image source={image} style={styles.image} />
                <View style={styles.iRestaurants}>
                    <Text style={styles.textRestaurants}>{restaurant}</Text>
                    <Text style={styles.categories}>{categories} </Text>
                    <View style={styles.rate}>
                        <View style={styles.row}>
                            <Icon
                                name='star'
                                size={20}
                                color={global.primaryColor}
                            />
                            <Text style={[styles.numberRate, styles.textInfo]}>
                                4.7
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Icon
                                name='car-side'
                                size={20}
                                color={global.primaryColor}
                            />
                            <Text style={styles.textInfo}>Free</Text>
                        </View>
                        <View style={styles.row}>
                            <Icon
                                name='clock'
                                size={20}
                                color={global.primaryColor}
                            />
                            <Text style={styles.textInfo}>20 min</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 20,
    },
    image: {
        width: '100%',
        height: '60%',
        borderRadius: 15,
    },
    restaurants: {
        width: '90%',
        height: 250,
        borderRadius: 15,
        alignItems: 'center',
    },
    iRestaurants: {
        paddingTop: 10,
        width: '100%',
    },
    textRestaurants: {
        fontSize: 18,
        textTransform: 'capitalize',
        color: global.textPrimaryColor,
        marginBottom: 5,
    },
    categories: {
        color: global.textNote,
    },
    rate: {
        flexDirection: 'row',
        width: 250,
        justifyContent: 'space-between',
        marginTop: 15,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInfo: {
        marginLeft: 5,
        color: global.textPrimaryColor,
    },
    numberRate: {
        fontWeight: '700',
    },
})
