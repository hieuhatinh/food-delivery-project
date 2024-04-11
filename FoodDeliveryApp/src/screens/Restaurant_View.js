import React, { useState } from 'react'
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import { global } from '../global'
import SuggestRestaurants from './components/SuggestRestaurants'
import BoundaryScreen from '../components/BoundaryScreen'
import HeaderSecondary from '../components/header/HeaderSecondary'
// import CardMeal from '../../components/Card/CardMeal'
import CartNorify from '../components/icon/CartNotify'
import axiosClient from '../api/axiosClient'
import Loading from '../components/Loading'
import CardMeal from '../components/Card/CardMeal'

const recentKeywords = [
    { id: 1, suggestName: 'Burge' },
    { id: 2, suggestName: 'Burge' },
    { id: 3, suggestName: 'Burge' },
    { id: 4, suggestName: 'Burge' },
    { id: 5, suggestName: 'Burge' },
    { id: 6, suggestName: 'Burge' },
]

const meals = [
    {
        _id: 1,
        artwork: {
            path: 'https://images.pexels.com/photos/2282532/pexels-photo-2282532.jpeg?auto=compress&cs=tinysrgb&w=600',
        },
        foodName: 'Burger',
        restaurant: {
            restaurantName: 'Restaurant Danh Hieu',
        },
        priceAndSize: {
            price: '34323',
            size: 'L',
        },
    },
]

export default function Search({ navigation }) {
    const [isClick, setClick] = useState(1)
    const [searchValue, setSearchValue] = useState()
    const [loading, setLoading] = useState(false)

    const handleChangeSearch = (value) => {
        setSearchValue(value)
    }

    const handleEnter = async () => {
        setLoading(true)

        setTimeout(async () => {
            let resultSearch = await axiosClient.get(
                `/search/meal?searchValue=${searchValue?.trim().toLowerCase()}`,
            )
            if (resultSearch.status === 200) {
                setLoading(false)
                navigation.navigate('ResultByName', {
                    title: searchValue,
                    data: resultSearch.data.meals,
                })
            }
        }, 1500)
    }

    return (
        <BoundaryScreen >
            {/* Header */}
            <HeaderSecondary
                iconNotify={<Icon name='dots-three-horizontal' size={15} />}
            >
                <Text style={styles.title}>Restaurant View</Text>
            </HeaderSecondary>
            {loading ? (
                <Loading />
            ) : (
                <ScrollView
                    style={styles.container}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Recent Keywords */}
                    <React.Fragment>
                        <Image
                            source={require('../assets/images/Image.png')}
                            style={{ left: 20 }}
                        />
                        <Text style={{ fontSize: 20, fontWeight: 'bold',marginTop:10 }}>
                            Spicy restaurant
                        </Text>
                        <Text style={{ fontSize: 14, color: '#A0A5BA',marginTop:10 }}>
                            Maecenas sed diam eget risus varius blandit sit amet
                            non magna. Integer posuere erat a ante venenatis
                            dapibus posuere velit aliquet.
                        </Text>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            style={styles.row}
                        >
                            {recentKeywords.map((item) => (
                                <TouchableOpacity
                                   
                                    key={item.id}
                                    style={{
                                        ...styles.recentKeyword,
                                        backgroundColor:
                                            item.id === isClick ? global.primaryColor : 'white',
                                    }}
                                    onPress={() =>{ setClick(item.id);
                                        ;}}
                                >
                                    <Text style={{ color:
                                        item.id != isClick ? global.secondaryColor : 'white',}}>{item.suggestName}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        <Text style={{ fontSize: 20, fontWeight: 'bold',marginTop:10 }}>
                            Burger
                        </Text>

                        <View style={{flexDirection:'row'}}>
                            {meals.map((item) => (
                                <CardMeal key={item.id} {...item} ></CardMeal>

                            ))}
                            {meals.map((item) => (
                                <CardMeal key={item.id} {...item} ></CardMeal>

                            ))}
                        </View>

                        <View style={{flexDirection:'row'}}>
                            {meals.map((item) => (
                                <CardMeal key={item.id} {...item} ></CardMeal>

                            ))}
                            {meals.map((item) => (
                                <CardMeal key={item.id} {...item} ></CardMeal>

                            ))}
                        </View>
                  
                        

                       
                    </React.Fragment>
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
    row: {
        flexDirection: 'row',
        paddingTop: 20,
    },
    sectionTitle: {
        fontSize: 18,
        marginTop: 20,
    },
    recentKeyword: {
        width: 90,
        height: 50,
        borderWidth: 2,
        borderColor: '#EDEDED',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
})
