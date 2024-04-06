import { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'

export default function Order({nameFood, price, image, number}) {
    const [quantity, setQuantity] = useState(number)

    const onClickPlus = () =>{
        setQuantity(quantity + 1)
    }
    const onClickMinus = () =>{
        quantity > 0? setQuantity(quantity - 1): setQuantity(quantity)
    }

    return (
        <View style={styles.orderBox}>
            <Image
                source={image}
                style={styles.image}
            />
            <View style={styles.numberFood}>
                <View style={styles.row}>
                    <View style={styles.icon}>
                        <Icon name='minus' size={20}  onPress={onClickMinus}/>
                    </View>
                    <Text style={{ paddingHorizontal: 20 }}>{quantity}</Text>
                    <View style={styles.icon}>
                        <Icon name='plus' size={20} onPress={onClickPlus} />
                    </View>
                </View>
            </View>
            <View style={styles.notification}>
                <Text style={styles.nameFood}>{nameFood}</Text>
                <Text style={styles.price}>${price}</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    orderBox: {
        marginTop: 30,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    image: {
        width: 135,
        height: 115,
        borderRadius: 20,
    },
    numberFood: {
        justifyContent: 'flex-end',
    },
    icon: {
        width: 22,
        height: 22,
        backgroundColor: 'red',
        borderRadius: 100,
    },
    notification: {
        width: '50%',
        position: 'absolute',
        left: 175,
    },
    nameFood: {
        fontSize: 18,
        flexWrap: 'wrap',
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
    },
})

