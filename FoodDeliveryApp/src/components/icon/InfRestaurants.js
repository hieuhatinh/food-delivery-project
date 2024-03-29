import { Image, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

export default function InfRestaurants({ restaurant, nameFood, image }) {
    return (
        <View style={styles.container}>
            <View style={styles.restaurants}>
                <Image source={image} style={styles.image} />
                <View style={styles.iRestaurants}>
                    <Text style={styles.textRestaurants}>{restaurant}</Text>
                    <Text style={styles.textFood}>{nameFood} </Text>
                    <View style={styles.rate}>
                        <View style={styles.row}>
                            <Icon name='star' size={20} />
                            <Text style={styles.numberRate}> 4.7</Text>
                        </View>
                        <View style={styles.row}>
                            <Icon name='car-side' size={20} />
                            <Text> Free</Text>
                        </View>
                        <View style={styles.row}>
                            <Icon name='clock' size={20} />
                            <Text> 20 min</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingTop: 20,
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
    },
    textFood: {
        color: '#A0A5BA',
    },
    rate: {
        flexDirection: 'row',
        width: 250,
        justifyContent: 'space-between',
        paddingTop: 10,
    },
    row: {
        flexDirection: 'row',
    },
    numberRate: {
        fontWeight: '700',
    },
})
