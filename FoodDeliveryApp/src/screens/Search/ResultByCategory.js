import React, { useState } from 'react'
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    ScrollView,
    TouchableWithoutFeedback,
} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native'

import HeaderSecondary from '../../components/header/HeaderSecondary'
import { global } from '../../global'
import BoundaryScreen from '../../components/BoundaryScreen'
import CardMeal from '../../components/Card/CardMeal'
import HeaderSection from '../../components/header/HeaderSection'
import OpenRestaurantsComp from '../components/OpenRestaurantsComp'
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

const categories = [
    'Burger',
    'Chicken',
    'Pizza',
    'Cơm',
    'Cháo',
    'Phở',
    'Bánh mì',
]

const ResultByCategory = () => {
    const navigation = useNavigation()

    const [isOpenDropdown, setIsOpenDropdown] = useState(false)
    const [category, setCategory] = useState('burger')

    const handleSeeAllMeals = () => {
        navigation.navigate('ResultByName')
    }

    const handleChooseCategory = (value) => {
        setCategory(value)
    }

    const toggoleDropdown = () => {
        setIsOpenDropdown(!isOpenDropdown)
    }

    const handlePressOutside = () => {
        setIsOpenDropdown(false)
    }

    return (
        <BoundaryScreen>
            <TouchableWithoutFeedback onPress={handlePressOutside}>
                <HeaderSecondary
                    iconRightFirst={{
                        backgroundColor: global.secondaryColor,
                        name: 'magnifying-glass',
                    }}
                    iconNotify={<CartNorify />}
                >
                    <View>
                        <TouchableOpacity
                            style={styles.buttonListSearch}
                            onPress={toggoleDropdown}
                        >
                            <Text
                                style={styles.categoryName}
                                numberOfLines={1}
                                ellipsizeMode='tail'
                            >
                                {category}
                            </Text>
                            <Icon
                                name='triangle-down'
                                size={20}
                                color='#f58d1d'
                            />
                        </TouchableOpacity>
                        <ScrollView
                            style={styles.dropdown}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{
                                justifyContent: 'space-between',
                            }}
                        >
                            <View style={{ height: 40 }} />
                            {categories.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.item,
                                        index !== categories.length &&
                                            styles.borderBottom,
                                    ]}
                                    onPress={handleChooseCategory}
                                >
                                    <Text numberOfLines={2}>{item}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
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
                            {meals.map((item) => (
                                <CardMeal key={item.id} {...item} />
                            ))}
                        </View>
                    </View>

                    {/* Open restaurant */}
                    <OpenRestaurantsComp />
                </ScrollView>
            </TouchableWithoutFeedback>
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
        width: 150,
        height: 40,
        paddingHorizontal: 10,
        zIndex: 10,
        backgroundColor: '#fff',
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

    // dropdown categories
    dropdown: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%',
        height: 200,
        borderRadius: 25,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    item: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    borderBottom: {
        borderBottomColor: '#ccc',
        borderWidth: 1,
    },
})

export default ResultByCategory
