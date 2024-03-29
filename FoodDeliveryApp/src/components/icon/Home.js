import {
    FlatList,
    Image,
    ScrollView,
    SectionList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import BoxFood from './BoxFood'
import InfRestaurants from './InfRestaurants'

const categoryies = [
    {
        catgoryName: 'Pizza',
        image: require('../../assets/images/logo.jpg'),
    },
    {
        catgoryName: 'Burger',
        image: require('../../assets/images/logo.jpg'),
    },
    {
        catgoryName: 'Chicken',
        image: require('../../assets/images/logo.jpg'),
    },
]

const restaurants = [
    {
        id: 1,
        nameRestaurant: 'Pizza',
        image: require('../../assets/images/logo.jpg'),
        foods: 'Burger - Chiken - Riche - Wings',
    },
    {   
        id: 2,
        nameRestaurant: 'Pizza',
        image: require('../../assets/images/logo.jpg'),
        foods: 'Burger - Chiken - Riche - Wings',
    },
    {
        id: 3,
        nameRestaurant: 'Pizza',
        image: require('../../assets/images/logo.jpg'),
        foods: 'Burger - Chiken - Riche - Wings',
    },
]

export default function Home({ navigation }) {
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={{ marginLeft: 20 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.headerLeft}>
                            <Image
                                source={require('../../assets/images/logo 1.png')}
                                style={styles.logo}
                            />
                        </TouchableOpacity>
                        <View style={{ paddingLeft: 20 }}>
                            <Text
                                style={styles.textWellCom}
                            >
                                WELLCOME TO
                            </Text>
                            <View
                                style={{
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                }}
                            >
                                <Text>FoodShopping</Text>
                            </View>
                        </View>
                        <View style={styles.headerRight}>
                            <Icon
                                name='bell'
                                size={30}
                                style={{ color: '#181C2E' }}
                            />
                        </View>
                    </View>
                </View>
                <View style={[styles.row, { marginLeft: 20 }]}>
                    <Text>Hey Septa, </Text>
                    <Text style={{ fontWeight: '700' }}>Good Afternoon!</Text>
                </View>
                <TouchableOpacity
                    style={{ margin: 20, marginTop: 10 }}
                    onPress={() => navigation.navigate('ScreenSearch')}
                >
                    <TextInput
                        placeholder='What will you like to eat?'
                        style={styles.search}
                        editable={false}
                    />
                    <Icon name='search' size={30} style={styles.iconSearch} />
                </TouchableOpacity>
                <View >
                    <View
                        style={[
                            styles.boxTitle
                        ]}
                    >
                        <Text style={{ fontSize: 18 }}>All Categories</Text>
                        <TouchableOpacity
                            style={styles.btnSeeAll}
                        >
                            <Text>See all</Text>
                            <Icon
                                name='caret-right'
                                size={20}
                                style={{ marginLeft: 5 }}
                            />
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={{ maxHeight: 200 }}
                    >
                        <View style={styles.row}>
                            {categoryies.map((item) => (
                                <BoxFood
                                    key={item.catgoryName}
                                    text={item.catgoryName}
                                    image={item.image}
                                />
                            ))}
                        </View>
                    </ScrollView>
                </View>
                
                <View
                    style={styles.boxTitle}
                >
                    <Text style={{ fontSize: 18 }}>Open Restaurants</Text>
                    <TouchableOpacity
                        style={styles.btnSeeAll}
                    >
                        <Text>See all</Text>
                        <Icon
                            name='caret-right'
                            size={20}
                            style={{ marginLeft: 5 }}
                        />
                    </TouchableOpacity>
                </View>
                {restaurants.map((item) => (
                                <InfRestaurants
                                key={item.id}
                                restaurant= {item.nameRestaurant} 
                                nameFood={item.foods}
                                image={require('../../assets/images/avatar.png')}
                            />
                            ))}
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
    logo: {
        height: 45,
        width: 45,
        borderRadius: 100,
    },
    textWellCom:{
        color: '#FC6E2A',
        fontWeight: '900',
        fontSize: 15,
    },
    headerLeft: {
        width: 45,
        height: 45,
        backgroundColor: '#ECF0F4',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    },
    headerRight: {
        height: 45,
        width: 45,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 20,
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
    boxTitle:{
        flexDirection: 'row',
        paddingTop: 20,
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingLeft: 20,
    },
    btnSeeAll:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 20,
    }
})
