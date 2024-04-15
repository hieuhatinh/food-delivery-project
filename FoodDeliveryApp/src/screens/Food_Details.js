import React, { useEffect, useState } from 'react'
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native'

import BoundaryIcon from '../components/button/BoundaryIcon'
import Button from '../components/button/Button'
import BoundaryScreen from '../components/BoundaryScreen'
import HeaderSecondary from '../components/header/HeaderSecondary'
import { global } from '../global'
import CartNotify from '../components/icon/CartNotify'

import { fetchMealDetail } from '../store/actions/mealAction'
import {
    selectMeal,
    selectSizeAndQuantity,
    selectSizesMeal,
} from '../store/selector/mealSelector'
import Loading from '../components/Loading'
import { setQuantity, setSize } from '../store/slice/mealSlice'

const Food_Details = () => {
    const route = useRoute()
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const { isLoading, error, isSuccess, mealInfo } = useSelector(selectMeal)
    const sizes = useSelector(selectSizesMeal)
    const sizeAndQuantity = useSelector(selectSizeAndQuantity)

    function handleClickPlus() {
        dispatch(setQuantity(sizeAndQuantity.quantity + 1))
    }

    function handleClickMinus() {
        if (sizeAndQuantity.quantity > 1) {
            dispatch(setQuantity(sizeAndQuantity.quantity - 1))
        }
    }

    function handleSetSize(size) {
        dispatch(setSize(size))
    }

    const handleNavigate = () => {
        navigation.navigate('RestaurantView', {
            idRestaurant: mealInfo.restaurant._id,
        })
    }

    useEffect(() => {
        dispatch(fetchMealDetail({ idMeal: route.params?.idMeal }))
    }, [])

    return (
        <BoundaryScreen>
            <HeaderSecondary iconNotify={<CartNotify />}>
                <Text style={styles.title}>Details</Text>
            </HeaderSecondary>
            {isLoading ? (
                <React.Fragment>
                    <Loading />
                    <View style={{ flex: 1 }} />
                </React.Fragment>
            ) : (
                <ScrollView style={styles.scrollView}>
                    <Image
                        source={{ uri: mealInfo?.artwork?.path }}
                        style={styles.image}
                        resizeMode='contain'
                    />
                    <View style={styles.viewInfo}>
                        <TouchableOpacity
                            onPress={handleNavigate}
                            activeOpacity={0.8}
                            style={styles.viewRestaurantName}
                        >
                            <Image
                                source={require('../assets/images/Ellipse 1295.png')}
                            />
                            <Text style={styles.restaurantName}>
                                {mealInfo?.restaurant?.restaurantName}
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.foodName}>
                            {mealInfo?.foodName}
                        </Text>
                        <Text style={styles.foodDescribe}>
                            {mealInfo.describe}
                        </Text>

                        {sizes?.length > 1 && !!sizes[0] && (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 10,
                                }}
                            >
                                <Text style={{ fontSize: 13 }}>Size:</Text>
                                {sizes.map((item) => (
                                    <BoundaryIcon
                                        backgroundColor={
                                            item === sizeAndQuantity.size &&
                                            global.primaryColor
                                        }
                                        key={item}
                                        handlePress={() => handleSetSize(item)}
                                    >
                                        <Text>{item}</Text>
                                    </BoundaryIcon>
                                ))}
                            </View>
                        )}
                    </View>
                </ScrollView>
            )}
            <View style={styles.box}>
                <View style={styles.boxP1}>
                    <Text style={{ fontSize: 28 }}>
                        {sizeAndQuantity?.price}
                    </Text>
                    <View style={styles.buttonClick}>
                        <TouchableOpacity onPress={handleClickMinus}>
                            <Icon
                                name='circle-with-minus'
                                size={25}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                        <Text style={{ color: 'white' }}>
                            {sizeAndQuantity?.quantity}
                        </Text>
                        <TouchableOpacity onPress={handleClickPlus}>
                            <Icon
                                name='circle-with-plus'
                                size={25}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <Button title='ADD TO CART' disabled={isLoading} />
            </View>
        </BoundaryScreen>
    )
}
const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: '600',
    },
    scrollView: {
        width: '100%',
    },
    image: {
        flex: 1,
        width: '100%',
        height: 200,
        borderRadius: 20,
        marginTop: 15,
    },
    viewInfo: {
        marginHorizontal: 15,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
    },
    viewRestaurantName: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        padding: 10,
        maxWidth: 250,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#e8e8e8',
    },
    restaurantName: {
        fontSize: 14,
        flexWrap: 'wrap',
        marginLeft: 10,
        marginRight: 15,
    },
    foodName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    foodDescribe: {
        color: global.textFifthColor,
        marginVertical: 15,
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
