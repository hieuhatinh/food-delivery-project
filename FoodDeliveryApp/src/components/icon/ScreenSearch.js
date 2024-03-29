import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import KeyWord from './KeyWord'
import SuggestRestaurants from './SuggestRestaurants'
import FastFood from './FastFood'

export default function Header({ navigation }) {
    const suggests = [
        { id: 1, suggest: 'Burge' },
        { id: 2, suggest: 'Burge' },
        { id: 3, suggest: 'Burge' },
        { id: 4, suggest: 'Burge' },
        { id: 5, suggest: 'Burge' },
        { id: 6, suggest: 'Burge' },
    ]

    const suggestRestaurants = [
        {
            id: 1,
            restaurant: 'Pansi Restaurant',
            image: require('../../assets/images/avatar.png'),
            rate: 4.7,
        },
        {
            id: 2,
            restaurant: 'Pansi Restaurant',
            image: require('../../assets/images/avatar.png'),
            rate: 4.7,
        },
        {
            id: 3,
            restaurant: 'Pansi Restaurant',
            image: require('../../assets/images/avatar.png'),
            rate: 4.7,
        },
        {
            id: 4,
            restaurant: 'Pansi Restaurant',
            image: require('../../assets/images/avatar.png'),
            rate: 4.7,
        },
    ]
    const popularFood = [
        {
            id: 1,
            nameFood: 'Thịt luộc',
            restaurant: 'Hà nội',
            image: require('../../assets/images/logo.jpg'),
        },
        {
            id: 2,
            nameFood: 'Thịt luộc',
            restaurant: 'Hà nội',
            image: require('../../assets/images/logo.jpg'),
        },
        {
            id: 3,
            nameFood: 'Thịt luộc',
            restaurant: 'Hà nội',
            image: require('../../assets/images/logo.jpg'),
        },
        {
            id: 4,
            nameFood: 'Thịt luộc',
            restaurant: 'Hà nội',
            image: require('../../assets/images/logo.jpg'),
        },
    ]

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={{ marginLeft: 20 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            style={styles.headerLeft}
                            onPress={() => navigation.goBack()}
                        >
                            <Icon name='angle-left' size={25} />
                        </TouchableOpacity>
                        <View
                            style={{
                                paddingLeft: 20,
                                justifyContent: 'center',
                            }}
                        >
                            <Text style={{ fontSize: 20 }}>Search</Text>
                        </View>
                        <View style={styles.headerRight}>
                            <Icon
                                name='shopping-bag'
                                size={30}
                                style={styles.iconBag}
                            />
                            <View style={styles.number}>
                                <Text>2</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ margin: 20, marginTop: 10 }}>
                    <TextInput
                        placeholder='What will you like to eat?'
                        style={styles.search}
                    />
                    <Icon name='search' size={30} style={styles.iconSearch} />
                </View>
                <View style={{ paddingTop: 20 }}>
                    <Text style={{ fontSize: 18, marginLeft: 20 }}>
                        Recent Keywords
                    </Text>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={{ maxHeight: 200 }}
                    >
                        <View style={[styles.row]}>
                            {suggests.map((item) => (
                                <KeyWord key={item.id} name={item.suggest} />
                            ))}
                        </View>
                    </ScrollView>
                </View>
                <View style={{ padding: 20 }}>
                    <Text style={{ fontSize: 18 }}>Suggested Restaurants</Text>
                    <View>
                        {suggestRestaurants.map((item) => (
                            <SuggestRestaurants
                                key={item.id}
                                restaurant={item.restaurant}
                                image={item.image}
                                rate={item.rate}
                            />
                        ))}
                    </View>
                </View>
                <View>
                    <Text style={{ fontSize: 18, paddingLeft: 20 }}>
                        Popular Fast food
                    </Text>
                    <View style={styles.boxPopularFastFood}>
                        {popularFood.map((item) => (
                            <FastFood
                                key={item.id}
                                nameFood={item.nameFood}
                                restaurant={item.restaurant}
                                image={item.image}
                            />
                        ))}
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
    },
    row: {
        flexDirection: 'row',
        paddingTop: 20,
    },
    headerLeft: {
        width: 45,
        height: 45,
        backgroundColor: '#ECF0F4',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    },
    iconBag: {
        color: '#FFFFFF',
    },
    headerRight: {
        height: 45,
        width: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#181C2E',
        position: 'absolute',
        right: 20,
        borderRadius: 100,
    },
    number: {
        width: 23,
        height: 23,
        backgroundColor: '#FF7622',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        right: 0,
    },
    search: {
        height: 60,
        width: '100%',
        backgroundColor: '#F6F6F6',
        paddingLeft: 60,
        borderRadius: 10,
    },
    iconSearch: {
        position: 'absolute',
        top: 15,
        left: 20,
    },
    boxPopularFastFood: {
        flexDirection: 'row',
        paddingBottom: 50,
        flexWrap: 'wrap',
    },
})
