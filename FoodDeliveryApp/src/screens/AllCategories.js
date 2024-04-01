import React from 'react'
import { FlatList, StyleSheet, Text } from 'react-native'

import HeaderSecondary from '../components/header/HeaderSecondary'
import BoundaryScreen from '../components/BoundaryScreen'
import CardCategory from '../components/Card/CardCategory'
import CartNorify from '../components/icon/CartNotify'

const categories = [
    {
        id: 1,
        categoryName: 'Pizza',
        image: require('../assets/images/logo.jpg'),
    },
    {
        id: 2,
        categoryName: 'Burger',
        image: require('../assets/images/logo.jpg'),
    },
    {
        id: 3,
        categoryName: 'Chicken',
        image: require('../assets/images/logo.jpg'),
    },
    {
        id: 4,
        categoryName: 'Chicken',
        image: require('../assets/images/logo.jpg'),
    },
    {
        id: 5,
        categoryName: 'Chicken',
        image: require('../assets/images/logo.jpg'),
    },
    {
        id: 6,
        categoryName: 'Chicken',
        image: require('../assets/images/logo.jpg'),
    },
]

const AllCategories = () => {
    return (
        <BoundaryScreen>
            <HeaderSecondary iconNotify={<CartNorify />}>
                <Text style={styles.title}>All Categories</Text>
            </HeaderSecondary>

            <FlatList
                data={categories}
                renderItem={({ item }) => <CardCategory {...item} />}
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
export default AllCategories
