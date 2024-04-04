import { useEffect, useState } from 'react'
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'

import { global } from '../global'
import CardCategory from '../components/Card/CardCategory'
import HeaderHome from '../components/header/HeaderHome'
import BoundaryScreen from '../components/BoundaryScreen'
import OpenRestaurantsComp from './components/OpenRestaurantsComp'
import HeaderSection from '../components/header/HeaderSection'
import axiosClient from '../api/axiosClient'
import Loading from '../components/Loading'
import { setRestaurants } from '../store/slice/restaurantSlice'
import { setCategoriesRedux } from '../store/slice/categoriesSlice'

export default function Home() {
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState([])

    const handlePressAllCategories = () => {
        navigation.navigate('AllCategories')
    }

    useEffect(() => {
        async function fetchGets() {
            let categoriesResult = await axiosClient.get(
                '/category/get-categories',
            )
            let openRes = await axiosClient.get('/restaurant/get-restaurants', {
                params: {
                    state: 'open',
                    limit: 3,
                },
            })

            if (categoriesResult.status == 200 && openRes.status === 200) {
                let categoriesRedux = categoriesResult.data.categories.map(
                    (item) => ({
                        _id: item._id,
                        categoryName: item.categoryName
                    }),
                )

                setCategories(categoriesResult.data.categories.slice(0,5))
                dispatch(setRestaurants(openRes.data.restaurants))
                dispatch(setCategoriesRedux(categoriesRedux))
                setLoading(false)
            }
        }

        const idTimeout = setTimeout(() => {
            fetchGets()
        }, 3000)

        return () => clearTimeout(idTimeout)
    }, [])

    return (
        <BoundaryScreen>
            {loading ? (
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
                        <Text style={{ fontWeight: '700' }}>
                            Good Afternoon!
                        </Text>
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
                            {categories?.map((item) => (
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
