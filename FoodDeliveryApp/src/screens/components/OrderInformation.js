import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const OrderInformation = ({ artwork, foodName, price, quantity, size }) => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={{ uri: artwork }} style={styles.image} />
                    <View style={styles.infRes}>
                        <Text style={styles.textRes}>{foodName} ({!!size && `size: ${size}`})</Text>
                        <Text style={styles.price}>{price}</Text>
                    </View>
                </View>
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ fontWeight: '700' }}>X{quantity}</Text>
                </View>
            </View>
        </View>
    )
}

export default OrderInformation

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        width: '100%'
    },
    image: {
        height: 90,
        width: 135,
        borderRadius: 20,
    },
    infRes: {
        paddingTop: 5,
        paddingLeft: 20,
    },
    textRes: {
        textTransform: 'uppercase',
        width: '70%',
        marginBottom: 10,
    },
    price: {
        fontWeight: 'bold',
        fontSize: 17,
    },
})
