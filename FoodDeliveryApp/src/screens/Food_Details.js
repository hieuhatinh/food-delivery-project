import React, { useState } from 'react'
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native'
import BoundaryIcon from '../components/button/BoundaryIcon'
import Icon from 'react-native-vector-icons/Entypo'
import Button from '../components/button/Button'
import BoundaryScreen from '../components/BoundaryScreen'
import HeaderSecondary from '../components/header/HeaderSecondary'
import { global } from '../global'

const size = [
    { id: 1, sizeName: 'M' },
    { id: 2, sizeName: 'L' },
    { id: 3, sizeName: 'XL' },
]
const Food_Details = () => {
    const [click, setClick] = useState(1)
    const [count, setCount] = useState(0)
    function handleClickPlus() {
        setCount(count + 1)
    }
    function handleClickMinus() {
        setCount(count - 1)
    }

    return (
        <BoundaryScreen>
            <HeaderSecondary>
                <Text style={styles.title}>Details</Text>
            </HeaderSecondary>
            <ScrollView >
                <Image
                    source={require('../assets/images/Heading Image.png')}
                    style={styles.image}
                />
                <View style={styles.viewInfo}>

                <View style={styles.restaurantName}>
                    <Image
                        source={require('../assets/images/Ellipse 1295.png')}
                    />
                    <Text style={{ fontSize: 14 }}>Uttora Coffee House</Text>
                </View>
                <Text style={styles.foodName}>
                    Chicken & Chips
                </Text>
                <Text style={styles.foodDescribe}>
                    Prosciutto e funghi is a pizza variety that is topped with
                    tomato sauce.
                </Text>

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                    }}
                >
                    <Text style={{ fontSize: 13 }}>Size:</Text>
                    {size.map((item) => (
                        <BoundaryIcon key={item.id}>
                            <Text>{item.sizeName}</Text>
                        </BoundaryIcon>
                    ))}
                </View>
                </View>
            </ScrollView>
            <View style={styles.box}>
                <View style={styles.boxP1}>
                    <Text style={{ fontSize: 28 }}>$32</Text>
                    <View style={styles.buttonClick}>
                        <TouchableOpacity onPress={handleClickMinus}>
                            <Icon
                                name='circle-with-minus'
                                size={25}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                        <Text style={{ color: 'white' }}> {count} </Text>
                        <TouchableOpacity onPress={handleClickPlus}>
                            <Icon
                                name='circle-with-plus'
                                size={25}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <Button title='ADD TO CART' />
            </View>
        </BoundaryScreen>
    )
}
const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: '600',
    },
    image: {
        width: "100%", 
        height: 200,
        borderRadius: 20, 
        marginTop: 15
    },
    viewInfo: {
        marginHorizontal: 15
    },
    restaurantName: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        padding: 14,
        gap: 10,
        width: 190,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#e8e8e8',
    },
    foodName: { 
        fontSize: 20, 
        fontWeight: 'bold' 
    },
    foodDescribe: { 
        color: global.textFifthColor, 
        marginVertical: 15
    },
    box: {
        backgroundColor: '#f0f5fa',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: '100%',
        padding: 15,
    },
    boxP1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonClick: {
        flexDirection: 'row',
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        gap: 13,
        height: 50,
        width: 130,
        marginBottom: 15,
    },
    icon: {
        color: 'white',
    },
})

export default Food_Details
