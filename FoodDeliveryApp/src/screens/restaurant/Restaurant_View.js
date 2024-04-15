import React, { useEffect, useState } from 'react'
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native'
import { useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'

import { global } from '../../global'
import BoundaryScreen from '../../components/BoundaryScreen'
import HeaderSecondary from '../../components/header/HeaderSecondary'
import CartNotify from '../../components/icon/CartNotify'
import Loading from '../../components/Loading'
import CardMeal from '../../components/Card/CardMeal'
import Rate from '../../components/Rate'

import { fetchDetailRestaurant } from '../../store/actions/restaurantInfoAction'
import {
    selectCategoriesInRes,
    selectInfoCategoryInRes,
    selectRestaurantInfo,
} from '../../store/selector/restaurantSelector'
import { setSelectCategory } from '../../store/slice/restaurantInfoSlice'
import Icon from 'react-native-vector-icons/Entypo'

export default function RestaurantView({ navigation }) {
    const route = useRoute()
    const dispatch = useDispatch()
    const { isLoading, error, isSuccess, restaurantInfo } =
        useSelector(selectRestaurantInfo)
    const categoriesInRes = useSelector(selectCategoriesInRes)
    const infoCategoryInRes = useSelector(selectInfoCategoryInRes)

    useEffect(() => {
        dispatch(
            fetchDetailRestaurant({ idRestaurant: route.params.idRestaurant }),
        )
    }, [])

    const handleChangeCategoryName = (categoryName) => {
        dispatch(setSelectCategory(categoryName))
    }

    return (
        <BoundaryScreen>
            {/* Header */}
            <HeaderSecondary iconNotify={<CartNotify />}>
                <Text style={styles.title}>Restaurant View</Text>
            </HeaderSecondary>
            {isLoading ? (
                <Loading />
            ) : (
                <ScrollView
                    style={styles.container}
                    showsVerticalScrollIndicator={false}
                >
                    <Image
                        source={{ uri: restaurantInfo.image?.path }}
                        style={styles.image}
                        resizeMode='cover'
                    />
                    <Text style={styles.restaurantName}>
                        {restaurantInfo.restaurantName}
                    </Text>
                    <Text style={styles.introduce}>
                        {restaurantInfo.introduce}
                    </Text>
                    <View style={styles.restaurantAddress}>
                        <Icon
                            name='location-pin'
                            color={global.primaryColor}
                            size={25}
                        />
                        <Text>{restaurantInfo.address}</Text>
                    </View>

                    <Rate star={restaurantInfo.rate} />

                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={styles.viewCategories}
                    >
                        {categoriesInRes?.map((item) => (
                            <TouchableOpacity
                                key={item}
                                style={{
                                    ...styles.viewCategory,
                                    backgroundColor:
                                        item ===
                                        infoCategoryInRes.categoryName.toLowerCase()
                                            ? global.primaryColor
                                            : 'white',
                                }}
                                onPress={() => handleChangeCategoryName(item)}
                            >
                                <Text
                                    style={{
                                        color:
                                            item !=
                                            infoCategoryInRes.categoryName.toLowerCase()
                                                ? global.secondaryColor
                                                : 'white',
                                    }}
                                >
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            marginTop: 10,
                        }}
                    >
                        {infoCategoryInRes.categoryName}
                    </Text>

                    <View style={styles.viewMeals}>
                        {infoCategoryInRes.meals.map((item) => (
                            <CardMeal key={item._id} {...item} />
                        ))}
                    </View>
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
    image: {
        width: '100%',
        height: 200,
        borderRadius: 20,
    },
    restaurantName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    introduce: {
        fontSize: 14,
        color: '#A0A5BA',
        marginVertical: 10,
    },
    restaurantAddress: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewCategories: {
        marginTop: 20,
    },
    row: {
        flexDirection: 'row',
        paddingTop: 20,
    },
    sectionTitle: {
        fontSize: 18,
        marginTop: 20,
    },
    viewCategory: {
        width: 110,
        height: 50,
        borderWidth: 1,
        borderColor: '#EDEDED',
        borderRadius: 100,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    viewMeals: {
        flexDirection: 'row',
        flex: 1,
        flexWrap: 'wrap',
        marginBottom: 20,
    },
})
