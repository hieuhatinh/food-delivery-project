import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
    Text,
    StyleSheet,
    View,
    useWindowDimensions,
    ActivityIndicator,
} from 'react-native'
import { ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
    TabView,
    SceneMap,
    TabBar,
    TabBarIndicator,
} from 'react-native-tab-view'
import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'

import HeaderSecondary from '../../components/header/HeaderSecondary'
import OrderItem from '../components/OrderItem'
import { global } from '../../global'
import { fetchGetOrders } from '../../store/actions/orderAction'
import { selectOrder } from '../../store/selector/orderSelector'
import NoneValuesNotify from '../../components/NoneValuesNotify'

const Orders = ({ button1, button2 }) => {
    let { isLoading, isError, orders } = useSelector(selectOrder)

    return (
        <React.Fragment>
            {isLoading ? (
                <View style={styles.activeIndicator}>
                    <ActivityIndicator size={30} />
                </View>
            ) : orders.length < 1 ? (
                <View>
                    <NoneValuesNotify textNotify='Chưa có đơn hàng nào.' />
                </View>
            ) : (
                <ScrollView>
                    {orders.map((item) => (
                        <OrderItem
                            key={item._id}
                            {...item}
                            btn1={button1}
                            btn2={button2}
                        />
                    ))}
                </ScrollView>
            )}
        </React.Fragment>
    )
}

const renderScene = ({ route }) => {
    switch (route.key) {
        case 'ongoing':
            return (
                <Orders
                    button1={{ title: 'Track order', outline: false }}
                    button2={{ title: 'Cancel', outline: true }}
                />
            )
        case 'history':
            return (
                <Orders
                    button1={{ title: 'Rate', outline: true }}
                    button2={{ title: 'Re-Order', outline: false }}
                />
            )
        default:
            return null
    }
}

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

    const isFocused = useIsFocused()
    const dispatch = useDispatch()

    const [index, setIndex] = useState(0)
    const [routes] = useState([
        { key: 'ongoing', title: 'Ongoing' },
        { key: 'history', title: 'History' },
    ])

    useEffect(() => {
        if (isFocused) {
            switch (index) {
                case 0:
                    dispatch(fetchGetOrders({ state: 'ongoing' }))
                    break
                case 1:
                    dispatch(fetchGetOrders({ state: 'history' }))
                    break
            }
        }
    }, [isFocused, index])

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
    activeIndicator: {
        justifyContent: 'center',
        alignItem: 'center',
    },
})
