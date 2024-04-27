import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native'

import { global } from '../../global'
import formatCurrency from '../../utils/formatCurrency'
import screenName from '../../screens/config/screenName'

const CardMeal = (props) => {
    const navigation = useNavigation()

    let priceVnd = formatCurrency(props?.priceAndSize[0]?.price)

    const handlePressPlus = () => {
        console.log('press plus')
    }

    const handlePressCart = () =>
        navigation.navigate(screenName.foodDetails, { idMeal: props._id })

    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.8}
            onPress={handlePressCart}
        >
            <Image
                source={{ uri: props?.artwork?.path }}
                style={styles.image}
                resizeMode='cover'
            />
            <View style={styles.box}>
                <Text
                    style={styles.mealName}
                    numberOfLines={2}
                    ellipsizeMode='tail'
                >
                    {props?.foodName}
                </Text>
                <Text
                    numberOfLines={2}
                    ellipsizeMode='tail'
                    style={styles.restaurantName}
                >
                    {props?.restaurant?.restaurantName}
                </Text>
                <View style={styles.footer}>
                    <Text style={styles.price}>{priceVnd}</Text>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={handlePressPlus}
                    >
                        <Icon
                            name='circle-with-plus'
                            size={32}
                            color={global.primaryColor}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
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
        height: 180,
        width: 170,
        justifyContent: 'space-between',
        paddingVertical: 50,
        padding: 10,
        gap: 10,
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
