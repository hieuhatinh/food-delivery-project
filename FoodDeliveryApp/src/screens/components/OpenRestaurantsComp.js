import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

import CardRestaurant from '../../components/Card/CardRestaurant'
import HeaderSection from '../../components/header/HeaderSection'

const OpenRestaurantsComp = () => {
    const navigation = useNavigation()
    const restaurants = useSelector((state) => state.restaurants)

    const handlePressOpenRes = () => {
        navigation.navigate('OpenRestaurants')
    }

    return (
        <View style={styles.container}>
            <HeaderSection
                title='Open Restaurants'
                handleSeeAll={handlePressOpenRes}
            />

            <View>
                {restaurants.map((item) => (
                    <CardRestaurant
                        key={item._id}
                        {...item}
                        categories={item.categories
                            .map((item) => item.categoryName)
                            .join('-')}
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
