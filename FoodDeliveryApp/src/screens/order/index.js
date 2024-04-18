import { Text, StyleSheet, View, useWindowDimensions } from 'react-native'
import { ScrollView } from 'react-native'
import { useState } from 'react'
import {
    TabView,
    SceneMap,
    TabBar,
    TabBarIndicator,
} from 'react-native-tab-view'

import HeaderSecondary from '../../components/header/HeaderSecondary'
import OrderItem from '../components/OrderItem'
import { global } from '../../global'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const DataFoodOnGoing = [
    {
        id: 123456,
        loai_mon_an: 'Food',
        nameFood: 'Pizza Hut',
        price: 45,
        item: 1,
        image: require('../../assets/images/avatar.png'),
    },
    {
        id: 235322,
        loai_mon_an: 'Food',
        nameFood: 'Pizza Hut',
        price: 45,
        item: 1,
        image: require('../../assets/images/avatar.png'),
    },
    {
        id: 234534,
        loai_mon_an: 'Food',
        nameFood: 'Pizza Hut',
        price: 45,
        item: 1,
        image: require('../../assets/images/avatar.png'),
    },
    ,
    {
        id: 454532,
        loai_mon_an: 'Food',
        nameFood: 'Pizza Hut',
        price: 45,
        item: 1,
        image: require('../../assets/images/avatar.png'),
    },
]
const DataFoodHistory = [
    {
        id: 123456,
        loai_mon_an: 'Food',
        nameFood: 'Pizza Hut',
        price: 45,
        dateTime: '29 Jan, 12:30',
        item: 1,
        image: require('../../assets/images/avatar.png'),
        status: 'Completed',
    },
    {
        id: 235322,
        loai_mon_an: 'Food',
        nameFood: 'Pizza Hut',
        price: 45,
        dateTime: '29 Jan, 12:30',
        item: 1,
        image: require('../../assets/images/avatar.png'),
        status: 'Canceled',
    },
    {
        id: 234534,
        loai_mon_an: 'Food',
        nameFood: 'Pizza Hut',
        price: 45,
        dateTime: '29 Jan, 12:30',
        item: 1,
        image: require('../../assets/images/avatar.png'),
        status: 'Completed',
    },
    ,
    {
        id: 454532,
        loai_mon_an: 'Food',
        nameFood: 'Pizza Hut',
        price: 45,
        dateTime: '29 Jan, 12:30',
        item: 1,
        image: require('../../assets/images/avatar.png'),
        status: 'Canceled',
    },
]

const OnGoing = () => {
    return (
        <ScrollView>
            {DataFoodOnGoing.map((item) => (
                <OrderItem key={item.id} {...item} />
            ))}
        </ScrollView>
    )
}

const History = () => {
    return (
        <ScrollView>
            {DataFoodHistory.map((item) => (
                <OrderItem
                    key={item.id}
                    {...item}
                    btn1='Rate'
                    btn2='Re-Order'
                    display='flex'
                />
            ))}
        </ScrollView>
    )
}

const renderScene = SceneMap({
    ongoing: OnGoing,
    history: History,
})

const renderTabBar = (props) => (
    <TabBar
        {...props}
        renderIndicator={(indicatorProps) => {
            const width =
                indicatorProps.getTabWidth(
                    indicatorProps.navigationState.index,
                ) - 30
            return (
                <TabBarIndicator
                    {...indicatorProps}
                    width={width}
                    style={{
                        backgroundColor: global.primaryColor,
                        marginLeft: 15,
                    }}
                />
            )
        }}
        renderLabel={({ route, focused, color }) => (
            <Text style={{ color, textTransform: 'capitalize' }}>
                {route.title}
            </Text>
        )}
        style={{ backgroundColor: '#fff' }}
        activeColor={global.primaryColor}
        inactiveColor={global.secondaryColor}
    />
)

export default function MyOrder() {
    const layout = useWindowDimensions()
    const insets = useSafeAreaInsets()

    const [index, setIndex] = useState(0)
    const [routes] = useState([
        { key: 'ongoing', title: 'Ongoing' },
        { key: 'history', title: 'History' },
    ])

    return (
        <View
            style={[
                styles.container,
                {
                    paddingTop: insets.top,
                    paddingBottom: insets.bottom,
                    paddingLeft: insets.left,
                    paddingRight: insets.right,
                },
            ]}
        >
            <View style={styles.viewHeader}>
                <HeaderSecondary
                    iconLeft={false}
                    iconRightSecond={{ name: 'dots-three-horizontal' }}
                    title='My order'
                />
            </View>

            <TabView
                renderTabBar={renderTabBar}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                lazy
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    viewHeader: {
        alignItems: 'center',
        marginTop: 10,
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomWidth: 2,
        borderBottomColor: '#CED7DF',
    },
    btn: {
        width: 150,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
        bottom: -1.75,
    },
})
