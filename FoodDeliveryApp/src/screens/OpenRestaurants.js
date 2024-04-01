import React from 'react'
import { FlatList, StyleSheet, Text } from 'react-native'

import HeaderSecondary from '../components/header/HeaderSecondary'
import BoundaryScreen from '../components/BoundaryScreen'
import CardRestaurant from '../components/Card/CardRestaurant'
import CartNorify from '../components/icon/CartNotify'

const restaurants = [
    {
        id: 1,
        restaurantName: 'rose garden restaurant',
        image: require('../assets/images/restaurant.png'),
        categories: 'Burger - Chiken - Riche - Wings',
    },
    {
        id: 2,
        restaurantName: 'rose garden restaurant',
        image: require('../assets/images/restaurant.png'),
        categories: 'Burger - Chiken - Riche - Wings',
    },
    {
        id: 3,
        restaurantName: 'rose garden restaurant',
        image: require('../assets/images/restaurant.png'),
        categories: 'Burger - Chiken - Riche - Wings',
    },
]

const OpenRestaurants = () => {
    return (
        <BoundaryScreen>
            <HeaderSecondary iconNotify={<CartNorify />}>
                <Text style={styles.title}>Open Restaurants</Text>
            </HeaderSecondary>

            <FlatList
                data={restaurants}
                renderItem={({ item }) => <CardRestaurant {...item} />}
                keyExtractor={(item) => item.id}
                numColumns={1}
                showsVerticalScrollIndicator={false}
                style={styles.flatlist}
            />
        </BoundaryScreen>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: '600',
    },
    flatlist: {
        width: '92%',
    },
})
export default OpenRestaurants
