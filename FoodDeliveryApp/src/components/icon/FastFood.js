import { Image, StyleSheet, Text } from 'react-native'
import { View } from 'react-native'

export default function FastFood({ restaurant, nameFood, image }) {
    return (
        <View style={styles.container}>
            <View style={[styles.boxFood, styles.shadow]}>
                <View style={styles.boxImage}>
                    <Image source={image} style={styles.imageFood} />
                </View>
                <View style={styles.nameFood}>
                    <Text style={styles.textFood}>{nameFood}</Text>
                    <Text style={styles.textRestaurant}>{restaurant}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 18,
    },
    boxFood: {
        width: 160,
        height: 170,
        backgroundColor: 'white',
        borderRadius: 24,
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 1,
        shadowRadius: 16.0,
        elevation: 24,
    },
    boxImage: {
        alignItems: 'center',
        paddingTop: 5,
    },
    nameFood: {
        padding: 10,
    },
    imageFood: {
        width: 100,
        height: 100,
        borderRadius: 100,
    },
    textFood: {
        fontSize: 16,
        fontWeight: '600',
    },
    textRestaurant: {
        color: '#646982',
    },
})
