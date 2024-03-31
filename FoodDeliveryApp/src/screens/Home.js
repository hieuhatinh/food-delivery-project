import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native'

import CardCategory from '../components/Card/CardCategory'
import CardRestaurant from '../components/Card/CardRestaurant'
import HeaderHome from '../components/header/HeaderHome'
import BoundaryScreen from '../components/BoundaryScreen'
import SectionHeader from '../components/SectionHeader'
import { global } from '../global'
import OpenRestaurantsComp from './components/OpenRestaurantsComp'

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

export default function Home() {
    const navigation = useNavigation()

    const handlePressAllCategories = () => {
        navigation.navigate('AllCategories')
    }

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
                    <SectionHeader
                        titleSection='All Categories'
                        handlePress={handlePressAllCategories}
                    />
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
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
                <OpenRestaurantsComp />
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
})
