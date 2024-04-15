import { useEffect, useState } from 'react'
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'

import { global } from '../global'
import CardCategory from '../components/Card/CardCategory'
import HeaderHome from '../components/header/HeaderHome'
import BoundaryScreen from '../components/BoundaryScreen'
import OpenRestaurantsComp from './components/OpenRestaurantsComp'
import HeaderSection from '../components/header/HeaderSection'
import Loading from '../components/Loading'

import { fetchGetCategories } from '../store/actions/categoryAction'
import { selectLimitCategories } from '../store/selector/categorySelector'
import { fetchOpenRes } from '../store/actions/restaurantAction'

export default function Home() {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const categoriesLimit = useSelector(selectLimitCategories)
    const isFocused = useIsFocused()

    const [greeting, setGreeting] = useState()

    const handlePressAllCategories = () => {
        navigation.navigate('AllCategories')
    }

    useEffect(() => {
        if (isFocused) {
            dispatch(fetchGetCategories({ limit: undefined }))
            dispatch(fetchOpenRes({ limit: 3, state: 'open' }))
        }
    }, [isFocused])

    // lấy buổi (sáng, trưa, chiều, tối) hiện tại
    useEffect(() => {
        const currentTime = new Date()
        const currentHour = currentTime.getHours()

        let greeting = ''

        if (currentHour < 12) {
            greeting = 'Good morning'
        } else if (currentHour < 18) {
            greeting = 'Good afternoon'
        } else {
            greeting = 'Good evening'
        }

        setGreeting(greeting)
    }, [])

    return (
        <BoundaryScreen>
            {categoriesLimit.isLoading ? (
                <View
                    style={{ height: '100%', width: '100%', top: 0, bottom: 0 }}
                >
                    <Loading />
                </View>
            ) : (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ width: '100%' }}
                >
                    {/* Header */}
                    <HeaderHome />

                    {/* Search */}
                    <View style={[styles.row, { marginLeft: 20 }]}>
                        <Text>Hey Septa, </Text>
                        <Text style={{ fontWeight: '700' }}>{greeting}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.search}
                        onPress={() => navigation.navigate('Search')}
                        activeOpacity={0.9}
                    >
                        <Icon name='magnifying-glass' size={25} />
                        <Text style={styles.textPlaceHolder}>
                            What will you like to eat?
                        </Text>
                    </TouchableOpacity>

                    {/* All categories */}
                    <View style={styles.headerSection}>
                        <HeaderSection
                            title='All Categories'
                            handleSeeAll={handlePressAllCategories}
                        />
                    </View>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        <View style={[styles.row, { paddingTop: 0 }]}>
                            {categoriesLimit.categories?.map((item) => (
                                <CardCategory key={item._id} {...item} />
                            ))}
                        </View>
                    </ScrollView>

                    {/* Open Restaurants */}
                    <View style={{ marginHorizontal: '5%' }}>
                        <OpenRestaurantsComp />
                    </View>
                </ScrollView>
            )}
        </BoundaryScreen>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        paddingTop: 20,
    },
    search: {
        height: 60,
        backgroundColor: global.backgroundTextInput,
        borderRadius: 10,
        marginHorizontal: 20,
        marginTop: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    textPlaceHolder: {
        color: global.textFourthColor,
        marginLeft: 10,
    },
    headerSection: {
        marginHorizontal: '5%',
        marginTop: 20,
    },
})
