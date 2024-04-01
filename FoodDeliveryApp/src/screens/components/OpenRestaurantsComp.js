import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import CardRestaurant from '../../components/Card/CardRestaurant'
import HeaderSection from '../../components/header/HeaderSection'

const restaurants = [
    {
        id: 1,
        nameRestaurant: 'rose garden restaurant',
        image: require('../../assets/images/restaurant.png'),
        categories: 'Burger - Chiken - Riche - Wings',
    },
    {
        id: 2,
        nameRestaurant: 'rose garden restaurant',
        image: require('../../assets/images/restaurant.png'),
        categories: 'Burger - Chiken - Riche - Wings',
    },
    {
        id: 3,
        nameRestaurant: 'rose garden restaurant',
        image: require('../../assets/images/restaurant.png'),
        categories: 'Burger - Chiken - Riche - Wings',
    },
]

const OpenRestaurantsComp = () => {
    const navigation = useNavigation()

    const handlePressOpenRes = () => {
        navigation.navigate('OpenRestaurants')
    }

    return (
        <View style={styles.container}>
            <HeaderSection
                title='Open Restaurants'
                handleSeeAll={handlePressOpenRes}
            />

            <View style={{ marginHorizontal: '5%' }}>
                {restaurants.map((item) => (
                    <CardRestaurant
                        key={item.id}
                        restaurant={item.nameRestaurant}
                        categories={item.categories}
                        image={item.image}
                    />
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
})

export default OpenRestaurantsComp
