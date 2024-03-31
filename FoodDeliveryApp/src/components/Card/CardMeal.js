import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import { global } from '../../global'

const CardMeal = ({ mealName, restaurantName, price, image }) => {
    return (
        <View style={styles.container}>
            <Image source={image} style={styles.image} resizeMode='cover' />
            <View style={styles.box}>
                <Text
                    style={styles.mealName}
                    numberOfLines={1}
                    ellipsizeMode='tail'
                >
                    {mealName}
                </Text>
                <Text style={styles.restaurantName}>{restaurantName}</Text>
                <View style={styles.footer}>
                    <Text style={styles.price}>{price}</Text>
                    <TouchableOpacity activeOpacity={0.9}>
                        <Icon
                            name='circle-with-plus'
                            size={32}
                            color={global.primaryColor}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        marginTop: -20,
    },
    box: {
        borderRadius: 24,
        backgroundColor: 'white',
        height: 140,
        width: 160,
        justifyContent: 'flex-start',
        paddingVertical: 50,
        padding: 10,
        gap: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    image: {
        height: 90,
        width: 130,
        borderRadius: 15,
        zIndex: 1,
        transform: [{ translateY: 40 }],
    },
    mealName: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    restaurantName: {
        fontSize: 13,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})
export default CardMeal
