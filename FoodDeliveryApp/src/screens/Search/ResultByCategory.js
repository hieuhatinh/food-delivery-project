import React from 'react'
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    ScrollView,
} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native'

import HeaderSecondary from '../../components/header/HeaderSecondary'
import { global } from '../../global'
import BoundaryScreen from '../../components/BoundaryScreen'
import CardMeal from '../../components/Card/CardMeal'
import HeaderSection from '../../components/header/HeaderSection'
import OpenRestaurantsComp from '../components/OpenRestaurantsComp'

const meals = [
    {
        mealName: 'Berger Bistro Berger BistroBerger BistroBerger Bistro',
        restaurantName: 'Rose Garden',
        price: '$40',
    },
    {
        mealName: 'Smokin Burger',
        restaurantName: 'Cafenio Restaurant',
        price: '$60',
    },
    {
        mealName: 'Buffalo Burgers',
        restaurantName: 'Kaji Firm Kitchen',
        price: '$75',
    },
    {
        mealName: 'Bullseye Burgers',
        restaurantName: 'Kabab restaurant',
        price: '$94',
    },
]

const ResultByCategory = () => {
    const navigation = useNavigation()

    const handleSeeAllMeals = () => {
        navigation.navigate('AllCategories')
    }

    return (
        <BoundaryScreen>
            <HeaderSecondary
                iconRightFirst={{
                    backgroundColor: global.secondaryColor,
                    name: 'magnifying-glass',
                }}
                iconRightSecond={{
                    name: 'shopping-basket',
                }}
            >
                <TouchableOpacity style={styles.buttonListSearch}>
                    <Text
                        style={styles.categoryName}
                        numberOfLines={1}
                        ellipsizeMode='tail'
                    >
                        BURGER
                    </Text>
                    <Icon name='triangle-down' size={20} color='#f58d1d' />
                </TouchableOpacity>
            </HeaderSecondary>

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.scrollView}
            >
                <View style={{ marginTop: 10 }}>
                    <HeaderSection
                        title='Popular Burgers'
                        handleSeeAll={handleSeeAllMeals}
                    />
                    <View style={styles.boxMenu}>
                        {meals.map((item, index) => (
                            <CardMeal
                                key={index}
                                mealName={item.mealName}
                                restaurantName={item.restaurantName}
                                price={item.price}
                            />
                        ))}
                    </View>
                </View>

                {/* Open restaurant */}
                <OpenRestaurantsComp />
            </ScrollView>
        </BoundaryScreen>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        width: '95%',
        marginTop: 5,
    },
    boxMenu: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    buttonListSearch: {
        flexDirection: 'row',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#d6d5d4',
        borderRadius: 50,
        width: 100,
        height: 40,
        paddingHorizontal: 10,
    },
    categoryName: {
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        flex: 1,
    },
    restaurant_Info: {
        marginTop: 50,
        left: 18,
        gap: 8,
    },
    footer_Icon: {
        flexDirection: 'row',
        gap: 50,
    },
    f1: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
})

export default ResultByCategory
