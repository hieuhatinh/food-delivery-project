import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Entypo'

import Button from '../../components/button/Button'
import formatCurrency from '../../utils/formatCurrency'

const OrderItem = (props) => {
    const [colorStatus, setColorStatus] = useState()

    useEffect(() => {
        let color
        switch (props.state) {
            case 'accepted':
                color = '#059C6A'
                break
            case 'getting':
                color = '#059C6A'
                break
            case 'delivering':
                color = '#059C6A'
                break
            case 'completed':
                color = '#059C6A'
                break
            case 'canceled':
                color = '#FF0000'
                break
        }

        setColorStatus(color)
    }, [])

    return (
        <View style={{ width: '100%' }}>
            <View style={[styles.row, { paddingTop: 20, paddingBottom: 10 }]}>
                <Text
                    style={{
                        color: colorStatus,
                        fontWeight: '500'
                    }}
                >
                    {props.state}
                </Text>
            </View>
            <View style={styles.box}>
                <Image
                    source={{ uri: props.meals[0].artwork }}
                    style={styles.image}
                />
                <View style={{ flex: 1, marginLeft: 20, alignItems: 'flex-start' }}>
                    <View style={styles.NameId}>
                        <Text style={styles.textFood}>
                            {props.meals[0].foodName}
                        </Text>
                    </View>
                    <View style={styles.priceItem}>
                        <Text style={styles.price}>
                            {formatCurrency(props.totalPayment)}
                        </Text>
                        <View style={styles.row}>
                            <Icon
                                name='dot-single'
                                size={20}
                                style={styles.colorDateTime}
                            />
                            <Text style={styles.colorDateTime}>
                                {props.meals.length} item
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.colorDateTime}>{props.updatedAt}</Text>
                </View>
            </View>
            <View style={styles.box2}>
                <View style={styles.btn2}>
                    <Button
                        height={50}
                        title={props.btn1.title}
                        outline={props.btn1.outline}
                        // handlePress={() => navigation.navigate('OrderSuccess')}
                    />
                </View>
                <View style={styles.btn2}>
                    <Button
                        height={50}
                        title={props.btn2.title}
                        outline={props.btn2.outline}
                        // handlePress={() => navigation.navigate('OrderSuccess')}
                    />
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    NameId: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textFood: {
        fontWeight: 'bold',
    },
    box: {
        paddingTop: 20,
        paddingLeft: 20,
        borderTopWidth: 1,
        borderTopColor: '#eef2f5',
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
        marginBottom: 5,
        flexDirection: 'row',
    },
    price: {
        borderRightWidth: 1,
        borderRightColor: '#6B6E82',
        fontWeight: 'bold',
    },
    box2: {
        marginVertical: 20,
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    btn2: {
        flex: 1,
        marginHorizontal: 5,
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
export default OrderItem
