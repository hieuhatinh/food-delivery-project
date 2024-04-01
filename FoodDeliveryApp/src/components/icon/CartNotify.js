import { StyleSheet, Text } from 'react-native'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import { global } from '../../global'

const CartNorify = () => {
    return (
        <View>
            <Icon size={20} name='shopping-basket' />
            <View style={styles.viewNumber}>
                <Text style={styles.number}>2</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewNumber: {
        top: -10,
        right: -10,
        borderRadius: 10,
        height: 20,
        width: 20,
        backgroundColor: global.primaryColor,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    number: {
        color: '#fff',
        fontSize: 12
    },
})

export default CartNorify
