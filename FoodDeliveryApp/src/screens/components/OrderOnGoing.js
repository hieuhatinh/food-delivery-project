import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import Button from '../../components/button/Button'
import Icon from 'react-native-vector-icons/Entypo'

const OrderOnGoing = ({
    loai_mon_an,
    image,
    nameFood,
    id,
    dateTime,
    price,
    item,
    btn1 = 'Track Order',
    btn2 = 'Cancel',
    status = 'Completed',
    display = 'none',
}) => {
    var colorStatus = '#059C6A'
    status == 'Completed'
        ? (colorStatus = '#059C6A')
        : (colorStatus = '#FF0000')
    return (
        <View>
            <View style={[styles.row, { paddingVertical: 20 }]}>
                <Text>{loai_mon_an}</Text>
                <Text
                    style={{
                        display: display,
                        paddingLeft: 30,
                        color: colorStatus,
                    }}
                >
                    {status}
                </Text>
            </View>
            <View style={styles.box}>
                <Image source={image} style={styles.image} />
                <View style={{ width: '80%' }}>
                    <View style={styles.NameId}>
                        <Text style={styles.textFood}>{nameFood}</Text>
                        <Text style={styles.id}>#{id}</Text>
                    </View>
                    <View style={styles.priceItem}>
                        <Text style={styles.price}>${price}</Text>
                        <View style={styles.row}>
                            <Text
                                style={[
                                    styles.colorDateTime,
                                    { display: display },
                                ]}
                            >
                                {dateTime}
                            </Text>
                            <Icon
                                name='dot-single'
                                size={20}
                                style={[
                                    styles.colorDateTime,
                                    { display: display },
                                ]}
                            />
                            <Text style={styles.colorDateTime}>
                                0{item} item
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.box2}>
                <View style={styles.btn2}>
                    <Button
                        height={50}
                        title={btn1}
                        // handlePress={() => navigation.navigate('OrderSuccess')}
                    />
                </View>
                <View style={[styles.btn2, { alignItems: 'flex-end' }]}>
                    <Button
                        height={50}
                        title={btn2}
                        outline={true}
                        // handlePress={() => navigation.navigate('OrderSuccess')}
                    />
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    NameId: {
        paddingLeft: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textFood: {
        fontWeight: 'bold',
    },
    box: {
        marginHorizontal: 20,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#6B6E82',
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: '20%',
        height: 60,
        borderRadius: 10,
    },
    priceItem: {
        paddingTop: 10,
        paddingLeft: 30,
        flexDirection: 'row',
    },
    price: {
        paddingRight: 20,
        borderRightWidth: 1,
        borderRightColor: '#6B6E82',
        fontWeight: 'bold',
    },
    box2: {
        margin: 20,
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btn2: {
        width: 160,
    },
    id: {
        textDecorationLine: 'underline',
        color: '#6B6E82',
    },
    row: {
        paddingLeft: 20,
        flexDirection: 'row',
    },
    colorDateTime: {
        color: '#6B6E82',
    },
})
export default OrderOnGoing
