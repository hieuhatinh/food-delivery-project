import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'

import SuggestRestaurants from '../components/SuggestRestaurants'
import BoundaryScreen from '../../components/BoundaryScreen'
import HeaderSecondary from '../../components/header/HeaderSecondary'
import CardMeal from '../../components/Card/CardMeal'
import CartNorify from '../../components/icon/CartNotify'
import axiosClient from '../../api/axiosClient'
import Loading from '../../components/Loading'

const recentKeywords = [
    { id: 1, suggestName: 'Burge' },
    { id: 2, suggestName: 'Burge' },
    { id: 3, suggestName: 'Burge' },
    { id: 4, suggestName: 'Burge' },
    { id: 5, suggestName: 'Burge' },
    { id: 6, suggestName: 'Burge' },
]

const suggestRestaurants = [
    {
        id: 1,
        restaurant: 'Pansi Restaurant',
        image: require('../../assets/images/restaurant-suggest.png'),
        rate: 4.7,
    },
    {
        id: 2,
        restaurant: 'Pansi Restaurant',
        image: require('../../assets/images/restaurant-suggest.png'),
        rate: 4.7,
    },
    {
        id: 3,
        restaurant: 'Pansi Restaurant',
        image: require('../../assets/images/restaurant-suggest.png'),
        rate: 4.7,
    },
    {
        id: 4,
        restaurant: 'Pansi Restaurant',
        image: require('../../assets/images/restaurant-suggest.png'),
        rate: 4.7,
    },
]

const popularFood = [
    {
        id: 1,
        nameFood: 'Thịt luộc',
        restaurant: 'Hà nội',
        image: require('../../assets/images/logo.jpg'),
        price: 5,
    },
    {
        id: 2,
        nameFood: 'Thịt luộc',
        restaurant: 'Hà nội',
        image: require('../../assets/images/logo.jpg'),
        price: 5,
    },
    {
        id: 3,
        nameFood: 'Thịt luộc',
        restaurant: 'Hà nội',
        image: require('../../assets/images/logo.jpg'),
        price: 5,
    },
    {
        id: 4,
        nameFood: 'Thịt luộc',
        restaurant: 'Hà nội',
        image: require('../../assets/images/logo.jpg'),
        price: 5,
    },
]

export default function Search({ navigation }) {
    const [searchValue, setSearchValue] = useState()
    const [loading, setLoading] = useState(false)

    const handleChangeSearch = (value) => {
        setSearchValue(value)
    }

    const handleEnter = async () => {
        setLoading(true)

        setTimeout(async () => {
            let resultSearch = await axiosClient.get(
                `/search/meal?searchValue=${searchValue?.trim().toLowerCase()}`,
            )
            if (resultSearch.status === 200) {
                setLoading(false)
                navigation.navigate('ResultByName', {
                    title: searchValue,
                    data: resultSearch.data.meals,
                })
            }
        }, 1500)
    }

    return (
        <BoundaryScreen>
            {/* Header */}
            <HeaderSecondary iconNotify={<CartNorify />}>
                <Text style={styles.title}>Search</Text>
            </HeaderSecondary>
            {loading ? (
                <Loading />
            ) : (
                <ScrollView
                    style={styles.container}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ marginTop: 10 }}>
                        <TextInput
                            placeholder='What will you like to eat?'
                            style={styles.search}
                            value={searchValue}
                            onChangeText={handleChangeSearch}
                            // onKeyPress={handleEnter}
                            onSubmitEditing={handleEnter}
                        />
                        <Icon
                            name='magnifying-glass'
                            size={25}
                            style={styles.iconSearch}
                        />
                    </View>

                    {/* Recent Keywords */}
                    <React.Fragment>
                        <Text style={styles.sectionTitle}>Recent Keywords</Text>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            style={styles.row}
                        >
                            {recentKeywords.map((item) => (
                                <View
                                    key={item.id}
                                    style={styles.recentKeyword}
                                >
                                    <Text>{item.suggestName}</Text>
                                </View>
                            ))}
                        </ScrollView>
                    </React.Fragment>

                    {/* Suggest restaurants */}
                    <View style={styles.viewSuggestRes}>
                        <Text style={styles.sectionTitle}>
                            Suggested Restaurants
                        </Text>
                        <View>
                            {suggestRestaurants.map((item) => (
                                <SuggestRestaurants
                                    key={item.id}
                                    restaurant={item.restaurant}
                                    image={item.image}
                                    rate={item.rate}
                                />
                            ))}
                        </View>
                    </View>

                    {/* Popular FastFood */}
                    {/* <React.Fragment>
                        <Text style={styles.sectionTitle}>
                            Popular Fast food
                        </Text>
                        <View style={styles.boxPopularFastFood}>
                            {popularFood.map((item) => (
                                <CardMeal
                                    key={item.id}
                                    mealName={item.nameFood}
                                    price={item.price}
                                    image={item.image}
                                    restaurantName={item.restaurant}
                                />
                            ))}
                        </View>
                    </React.Fragment> */}
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
        width: '95%',
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
    search: {
        height: 60,
        width: '100%',
        backgroundColor: '#F6F6F6',
        paddingLeft: 60,
        borderRadius: 10,
    },
    iconSearch: {
        position: 'absolute',
        top: 15,
        left: 20,
    },
    viewSuggestRes: {
        width: '90%',
    },
    boxPopularFastFood: {
        flexDirection: 'row',
        paddingBottom: 50,
        flexWrap: 'wrap',
    },
})
