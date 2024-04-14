import React, { useState } from 'react'
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import { global } from '../../global'
import SuggestRestaurants from '../components/SuggestRestaurants'
import BoundaryScreen from '../../components/BoundaryScreen'
import HeaderSecondary from '../../components/header/HeaderSecondary'
// import CardMeal from '../../components/Card/CardMeal'
import CartNorify from '../../components/icon/CartNotify'
import axiosClient from '../../api/axiosClient'
import Loading from '../../components/Loading'
import CardMeal from '../../components/Card/CardMeal'
import Rate from '../../components/Rate'

const categories = [
    { id: 1, suggestName: 'Burge' },
    { id: 2, suggestName: 'Burge' },
    { id: 3, suggestName: 'Burge' },
    { id: 4, suggestName: 'Burge' },
    { id: 5, suggestName: 'Burge' },
    { id: 6, suggestName: 'Burge' },
]

const meals = [
    {
        _id: 1,
        artwork: {
            path: 'https://images.pexels.com/photos/2282532/pexels-photo-2282532.jpeg?auto=compress&cs=tinysrgb&w=600',
        },
        foodName: 'Burger',
        restaurant: {
            restaurantName: 'Restaurant Danh Hieu',
        },
        priceAndSize: {
            price: '34323',
            size: 'L',
        },
    },
]

export default function RestaurantView({ navigation }) {
    const [isClick, setClick] = useState(1)
    const [loading, setLoading] = useState(false)

    return (
        <BoundaryScreen>
            {/* Header */}
            <HeaderSecondary
                iconNotify={<Icon name='dots-three-horizontal' size={15} />}
            >
                <Text style={styles.title}>Restaurant View</Text>
            </HeaderSecondary>
            {loading ? (
                <Loading />
            ) : (
                <ScrollView
                    style={styles.container}
                    showsVerticalScrollIndicator={false}
                >
                    <Image
                        source={require('../../assets/images/Image.png')}
                        style={styles.image}
                        resizeMode='cover'
                    />
                    <Text style={styles.restaurantName}>Spicy restaurant</Text>
                    <Text style={styles.introduce}>
                        Maecenas sed diam eget risus varius blandit sit amet non
                        magna. Integer posuere erat a ante venenatis dapibus
                        posuere velit aliquet.
                    </Text>

                    <Rate />

                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={styles.viewCategories}
                    >
                        {categories.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={{
                                    ...styles.recentKeyword,
                                    backgroundColor:
                                        item.id === isClick
                                            ? global.primaryColor
                                            : 'white',
                                }}
                                onPress={() => {
                                    setClick(item.id)
                                }}
                            >
                                <Text
                                    style={{
                                        color:
                                            item.id != isClick
                                                ? global.secondaryColor
                                                : 'white',
                                    }}
                                >
                                    {item.suggestName}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            marginTop: 10,
                        }}
                    >
                        Burger
                    </Text>

                    <View style={{ flexDirection: 'row' }}>
                        {meals.map((item) => (
                            <CardMeal key={item._id} {...item} />
                        ))}
                    </View>
                </ScrollView>
            )}
        </BoundaryScreen>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        fontWeight: '600',
    },
    container: {
        marginHorizontal: 10,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 20,
    },
    restaurantName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    introduce: {
        fontSize: 14,
        color: '#A0A5BA',
        marginVertical: 10,
    },
    viewCategories: {
        marginTop: 20,
    },
    row: {
        flexDirection: 'row',
        paddingTop: 20,
    },
    sectionTitle: {
        fontSize: 18,
        marginTop: 20,
    },
    recentKeyword: {
        width: 90,
        height: 50,
        borderWidth: 2,
        borderColor: '#EDEDED',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
})
