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
import { useDispatch, useSelector } from 'react-redux'

import HeaderSecondary from '../../components/header/HeaderSecondary'
import { global } from '../../global'
import BoundaryScreen from '../../components/BoundaryScreen'
import CardMeal from '../../components/Card/CardMeal'
import HeaderSection from '../../components/header/HeaderSection'
import OpenRestaurantsComp from '../components/OpenRestaurantsComp'
import CartNotify from '../../components/icon/CartNotify'

import { selectCategories } from '../../store/selector/categorySelector'
import {
    selectLimitSearch,
    selectSearch,
} from '../../store/selector/searchSelector'
import { fetchSearchByCategory } from '../../store/actions/searchAction'
import { fetchGetCategoriesName } from '../../store/actions/categoryAction'

const ResultByCategory = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const dispatch = useDispatch()
    const { categoriesName } = useSelector(selectCategories)
    const resultSearchState = useSelector(selectSearch)
    const resultSearchLimit = useSelector(selectLimitSearch)

    const [isOpenDropdown, setIsOpenDropdown] = useState(false)
    const [categoryInfo, setCategoryInfo] = useState({ ...route.params })

    // xử lý gọi api lấy tên các loại món
    useEffect(() => {
        dispatch(fetchGetCategoriesName())
    }, [])

    // xử lý gọi api tìm theo loại món
    useEffect(() => {
        dispatch(fetchSearchByCategory({ idCategory: categoryInfo._id }))
    }, [categoryInfo])

    // chuyển đến màn hình resultByName khi bấm vào see all
    const handleSeeAllMeals = () => {
        navigation.navigate('ResultByName', {
            title: categoryInfo.categoryName,
            data: resultSearchState.meals,
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
                iconNotify={<CartNotify />}
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
                                {categoriesName?.map((item, index) => (
                                    <TouchableOpacity
                                        key={item._id}
                                        style={[
                                            styles.item,
                                            index !==
                                                categoriesName.length - 1 &&
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
                {resultSearchState.isLoading ? (
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
                            {resultSearchLimit.map((item) => (
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
