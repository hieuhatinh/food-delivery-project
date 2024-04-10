import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text } from 'react-native'

import HeaderSecondary from '../../components/header/HeaderSecondary'
import BoundaryScreen from '../../components/BoundaryScreen'
import CardRestaurant from '../../components/Card/CardRestaurant'
import CartNorify from '../../components/icon/CartNotify'
import Loading from '../../components/Loading'
import axiosClient from '../../api/axiosClient'

const restaurants = [
    {
        id: 1,
        restaurantName: 'rose garden restaurant',
        image: require('../../assets/images/restaurant.png'),
        categories: 'Burger - Chiken - Riche - Wings',
    },
    {
        id: 2,
        restaurantName: 'rose garden restaurant',
        image: require('../../assets/images/restaurant.png'),
        categories: 'Burger - Chiken - Riche - Wings',
    },
    {
        id: 3,
        restaurantName: 'rose garden restaurant',
        image: require('../../assets/images/restaurant.png'),
        categories: 'Burger - Chiken - Riche - Wings',
    },
]

const OpenRestaurants = () => {
    const [loading, setLoading] = useState(true)
    const [openRestaurants, setOpenRestaurants] = useState([])

    useEffect(() => {
        async function fetchOpenRestaurants() {
            let restaurants = await axiosClient.get(
                '/restaurant/get-restaurants',
                {
                    params: { state: 'open' },
                },
            )
            
            if (restaurants.status === 200) {
                setOpenRestaurants(restaurants.data.restaurants)
                setLoading(false)
            }
        }

        const idTimeout = setTimeout(() => {
            fetchOpenRestaurants()
        }, 2000)

        return () => clearTimeout(idTimeout)
    }, [])

    return (
        <React.Fragment>
            {loading ? (
                <Loading />
            ) : (
                <BoundaryScreen>
                    <HeaderSecondary iconNotify={<CartNorify />}>
                        <Text style={styles.title}>Open Restaurants</Text>
                    </HeaderSecondary>

                    <FlatList
                        data={openRestaurants}
                        renderItem={({ item }) => (
                            <CardRestaurant
                                {...item}
                                categories={item.categories
                                    .map((item) => item.categoryName)
                                    .join('-')}
                                imageURI={item.image.path}
                            />
                        )}
                        keyExtractor={(item) => item._id}
                        numColumns={1}
                        showsVerticalScrollIndicator={false}
                        style={styles.flatlist}
                    />
                </BoundaryScreen>
            )}
        </React.Fragment>
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
