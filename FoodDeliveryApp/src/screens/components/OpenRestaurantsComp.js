import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

import CardRestaurant from '../../components/Card/CardRestaurant'
import HeaderSection from '../../components/header/HeaderSection'

import { selectRestaurants } from '../../store/selector/restaurantSelector'

const OpenRestaurantsComp = () => {
    const navigation = useNavigation()
    const restaurantState = useSelector(selectRestaurants)

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
                {restaurantState.restaurants?.map((item) => (
                    <CardRestaurant
                        key={item._id}
                        {...item}
                        categories={item.categories
                            .map((item) => item.categoryName)
                            .join('-')}
                        imageURI={item.image.path}
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
