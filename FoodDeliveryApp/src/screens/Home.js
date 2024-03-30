import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'

import CardCategory from '../components/Card/CardCategory'
import CardRestaurant from '../components/Card/CardRestaurant'
import HeaderHome from '../components/header/HeaderHome'
import BoundaryScreen from '../components/BoundaryScreen'
import SectionHeader from '../components/SectionHeader'
import { global } from '../global'

const categoryies = [
    {
        catgoryName: 'Pizza',
        image: require('../assets/images/logo.jpg'),
    },
    {
        catgoryName: 'Burger',
        image: require('../assets/images/logo.jpg'),
    },
    {
        catgoryName: 'Chicken',
        image: require('../assets/images/logo.jpg'),
    },
]

const restaurants = [
    {
        id: 1,
        nameRestaurant: 'rose garden restaurant',
        image: require('../assets/images/restaurant.png'),
        categories: 'Burger - Chiken - Riche - Wings',
    },
    {
        id: 2,
        nameRestaurant: 'rose garden restaurant',
        image: require('../assets/images/restaurant.png'),
        categories: 'Burger - Chiken - Riche - Wings',
    },
    {
        id: 3,
        nameRestaurant: 'rose garden restaurant',
        image: require('../assets/images/restaurant.png'),
        categories: 'Burger - Chiken - Riche - Wings',
    },
]

export default function Home({ navigation }) {
    return (
        <BoundaryScreen>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <HeaderHome />

                {/* Search */}
                <View style={[styles.row, { marginLeft: 20 }]}>
                    <Text>Hey Septa, </Text>
                    <Text style={{ fontWeight: '700' }}>Good Afternoon!</Text>
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
                <View style={styles.section}>
                    <SectionHeader titleSection='All Categories' />
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={{ maxHeight: 200 }}
                    >
                        <View style={styles.row}>
                            {categoryies.map((item) => (
                                <CardCategory
                                    key={item.catgoryName}
                                    text={item.catgoryName}
                                    image={item.image}
                                />
                            ))}
                        </View>
                    </ScrollView>
                </View>

                {/* Open Restaurants */}
                <View style={styles.section}>
                    <SectionHeader titleSection='Open Restaurants' />

                    {restaurants.map((item) => (
                        <CardRestaurant
                            key={item.id}
                            restaurant={item.nameRestaurant}
                            categories={item.categories}
                            image={item.image}
                        />
                    ))}
                </View>
            </ScrollView>
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
    section: {
        marginTop: 20,
    },
})
