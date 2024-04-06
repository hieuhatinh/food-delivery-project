import React, { useEffect, useState } from 'react'
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    ScrollView,
    ActivityIndicator,
} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import { useNavigation, useRoute } from '@react-navigation/native'

import HeaderSecondary from '../../components/header/HeaderSecondary'
import { global } from '../../global'
import BoundaryScreen from '../../components/BoundaryScreen'
import CardMeal from '../../components/Card/CardMeal'
import HeaderSection from '../../components/header/HeaderSection'
import OpenRestaurantsComp from '../components/OpenRestaurantsComp'
import CartNorify from '../../components/icon/CartNotify'
import { useDispatch, useSelector } from 'react-redux'
import axiosClient from '../../api/axiosClient'
import { getCategoriesName } from '../../store/slice/categoriesSlice'

const ResultByCategory = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const dispatch = useDispatch()
    // const allCategory = useSelector((state) => state.categories)

    const [isOpenDropdown, setIsOpenDropdown] = useState(false)
    const [categoryInfo, setCategoryInfo] = useState({ ...route.params })
    const [loading, setLoading] = useState(true)
    const [resultMeals, setResultMeals] = useState()
    const [allCategory, setAllCategory] = useState([])

    useEffect(() => {
        let categories = dispatch(getCategoriesName())

        setAllCategory(categories)
    })

    useEffect(() => {
        setLoading(true)
        async function fetchSearchByCategory() {
            let result = await axiosClient.get(
                `/search/category/${categoryInfo._id}`,
            )
            if (result.status === 200) {
                setResultMeals(result.data.meals)
                setLoading(false)
            }
        }

        let idTimeout = setTimeout(() => {
            fetchSearchByCategory()
        }, 1500)

        return () => clearTimeout(idTimeout)
    }, [categoryInfo])

    // chuyển đến màn hình resultByName khi bấm vào see all
    const handleSeeAllMeals = () => {
        navigation.navigate('ResultByName', {
            title: categoryInfo.categoryName,
            data: resultMeals,
        })
    }

    // xử lý khi chọn loại đồ ăn
    const handleChooseCategory = (value) => {
        setCategoryInfo({ ...value })
        setIsOpenDropdown(false)
    }

    const toggoleDropdown = () => {
        setIsOpenDropdown(!isOpenDropdown)
    }

    const handlePressSearchIcon = () => {
        navigation.navigate('Search')
    }

    return (
        <BoundaryScreen>
            <HeaderSecondary
                iconRightFirst={{
                    backgroundColor: global.secondaryColor,
                    name: 'magnifying-glass',
                    handlePress: handlePressSearchIcon,
                }}
                iconNotify={<CartNorify />}
            >
                <View>
                    <TouchableOpacity
                        style={styles.buttonListSearch}
                        onPress={toggoleDropdown}
                        activeOpacity={0.8}
                    >
                        <Text
                            style={styles.categoryName}
                            numberOfLines={1}
                            ellipsizeMode='tail'
                        >
                            {categoryInfo.categoryName}
                        </Text>
                        <Icon name='triangle-down' size={20} color='#f58d1d' />
                    </TouchableOpacity>
                    {isOpenDropdown && (
                        <View style={styles.viewDropdown}>
                            <ScrollView
                                style={styles.dropdown}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{
                                    justifyContent: 'space-between',
                                }}
                            >
                                <View style={{ height: 40 }} />
                                {allCategory?.map((item, index) => (
                                    <TouchableOpacity
                                        key={item._id}
                                        style={[
                                            styles.item,
                                            index !== allCategory.length - 1 &&
                                                styles.borderBottom,
                                        ]}
                                        onPress={() =>
                                            handleChooseCategory(item)
                                        }
                                    >
                                        <Text numberOfLines={2}>
                                            {item.categoryName}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    )}
                </View>
            </HeaderSecondary>

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.scrollView}
            >
                {loading ? (
                    <View>
                        <ActivityIndicator />
                    </View>
                ) : (
                    <View style={{ marginTop: 10 }}>
                        <HeaderSection
                            title={`${categoryInfo.categoryName} phổ biến`}
                            handleSeeAll={handleSeeAllMeals}
                        />
                        <View style={styles.boxMenu}>
                            {resultMeals.slice(0, 4).map((item) => (
                                <CardMeal key={item._id} {...item} />
                            ))}
                        </View>
                    </View>
                )}

                {/* Open restaurant */}
                <OpenRestaurantsComp />
            </ScrollView>
        </BoundaryScreen>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        width: '95%',
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
    viewDropdown: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%',
        height: 200,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    dropdown: {
        borderRadius: 25,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        zIndex: 1,
        overflow: 'hidden',
    },
    item: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    borderBottom: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
})

export default ResultByCategory
