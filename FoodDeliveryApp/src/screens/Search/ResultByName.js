import React from 'react'
import { FlatList, StyleSheet, Text } from 'react-native'

import HeaderSecondary from '../../components/header/HeaderSecondary'
import BoundaryScreen from '../../components/BoundaryScreen'
import CardMeal from '../../components/Card/CardMeal'
import CartNorify from '../../components/icon/CartNotify'

const meals = [
    {
        id: 1,
        mealName: 'Berger Bistro Berger BistroBerger BistroBerger Bistro',
        restaurantName: 'Rose Garden',
        price: '$40',
        image: require('../../assets/images/burger.png'),
    },
    {
        id: 2,
        mealName: 'Smokin Burger',
        restaurantName: 'Cafenio Restaurant',
        price: '$60',
        image: require('../../assets/images/burger.png'),
    },
    {
        id: 3,
        mealName: 'Buffalo Burgers',
        restaurantName: 'Kaji Firm Kitchen',
        price: '$75',
        image: require('../../assets/images/burger.png'),
    },
    {
        id: 4,
        mealName: 'Bullseye Burgers',
        restaurantName: 'Kabab restaurant',
        price: '$94',
        image: require('../../assets/images/burger.png'),
    },
]

const ResultByName = () => {
    return (
        <BoundaryScreen>
            <HeaderSecondary iconNotify={<CartNorify />}>
                <Text style={styles.title}>Burger</Text>
            </HeaderSecondary>

            <FlatList
                data={meals}
                renderItem={({ item }) => <CardMeal {...item} />}
                keyExtractor={(item) => item.id}
                numColumns={2}
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
        width: '95%',
    },
})
export default ResultByName
