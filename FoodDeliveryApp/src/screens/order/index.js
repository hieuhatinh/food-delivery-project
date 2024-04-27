import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
    Text,
    StyleSheet,
    View,
    useWindowDimensions,
    ActivityIndicator,
    FlatList,
    RefreshControl,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { TabView, TabBar, TabBarIndicator } from 'react-native-tab-view'
import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'

import NoneValuesNotify from '../../components/NoneValuesNotify'
import { global } from '../../global'
import HeaderSecondary from '../../components/header/HeaderSecondary'
import OrderItem from '../components/OrderItem'

import {
    fetchRefreshGetOrders,
    fetchLoadMoreGetOrders,
} from '../../store/actions/orderAction'
import { selectOrder } from '../../store/selector/orderSelector'
import { limit, typeLoadMore, typeRefresh } from '../../utils/configLoadData'
import { reState } from '../../store/slice/orderSlice'

const Orders = ({ button1, button2, handleRefresh, handleLoadMore }) => {
    let { isLoading, isError, orders, isStopLoadMore } =
        useSelector(selectOrder)

    return (
        <React.Fragment>
            {orders.length < 1 ? (
                <View>
                    <NoneValuesNotify textNotify='Chưa có đơn hàng nào.' />
                </View>
            ) : (
                <FlatList
                    data={orders}
                    renderItem={({ item }) => (
                        <OrderItem
                            key={item._id}
                            {...item}
                            btn1={button1}
                            btn2={button2}
                        />
                    )}
                    keyExtractor={(item) => item._id}
                    numColumns={1}
                    onEndReachedThreshold={0.2}
                    onEndReached={handleLoadMore}
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={handleRefresh}
                        />
                    }
                    ListFooterComponent={
                        isLoading &&
                        !isStopLoadMore && (
                            <ActivityIndicator
                                color={'red'}
                                style={{ paddingBottom: 20 }}
                            />
                        )
                    }
                />
            )}
        </React.Fragment>
    )
}

const renderScene = (props) => {
    switch (props.route.key) {
        case 'ongoing':
            return (
                <Orders
                    button1={{ title: 'Track order', outline: false }}
                    button2={{ title: 'Cancel', outline: true }}
                    handleRefresh={props.handleRefresh}
                    handleLoadMore={props.handleLoadMore}
                />
            )
        case 'history':
            return (
                <Orders
                    button1={{ title: 'Rate', outline: true }}
                    button2={{ title: 'Re-Order', outline: false }}
                    handleRefresh={props.handleRefresh}
                    handleLoadMore={props.handleLoadMore}
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

    let { isLoading, isError, orders, isStopLoadMore } =
        useSelector(selectOrder)

    const [index, setIndex] = useState(0)
    const [routes] = useState([
        { key: 'ongoing', title: 'Ongoing' },
        { key: 'history', title: 'History' },
    ])

    const handleGetData = async ({ type }) => {
        let state = routes[index].key

        if (!isStopLoadMore) {
            if (type === typeRefresh) {
                dispatch(
                    fetchRefreshGetOrders({
                        state,
                        limit,
                    }),
                )
            }

            if (type === typeLoadMore) {
                dispatch(
                    fetchLoadMoreGetOrders({
                        state,
                        limit,
                        skip: orders.length,
                    }),
                )
            }
        }
    }

    useEffect(() => {
        handleGetData({ type: typeRefresh })
    }, [index, routes[index].key])

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
                renderScene={(props) =>
                    renderScene({
                        ...props,
                        handleRefresh: () => {
                            handleGetData({ type: typeRefresh })
                        },
                        handleLoadMore: () => {
                            handleGetData({ type: typeLoadMore })
                        },
                    })
                }
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
