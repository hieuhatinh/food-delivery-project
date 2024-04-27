import React, { useEffect } from 'react'
import {
    FlatList,
    StyleSheet,
    ActivityIndicator,
    RefreshControl,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import HeaderSecondary from '../../components/header/HeaderSecondary'
import BoundaryScreen from '../../components/BoundaryScreen'
import CardRestaurant from '../../components/Card/CardRestaurant'
import CartNotify from '../../components/icon/CartNotify'

import {
    fetchRefreshOpenRes,
    fetchLoadMoreOpenRes,
} from '../../store/actions/restaurantAction'
import { selectRestaurants } from '../../store/selector/restaurantSelector'

import { limit, typeRefresh, typeLoadMore } from '../../utils/configLoadData'
import { reState } from '../../store/slice/restaurantsSlice'

const OpenRestaurants = ({navigation}) => {
    const dispatch = useDispatch()
    const { restaurants, isLoading, error, isSuccess, isStopLoadMore } =
        useSelector(selectRestaurants)
    
    const handlePressBack = () => {
        dispatch(reState())
        navigation.goBack()
    }

    const handleGetData = (type) => {
        if (!isStopLoadMore) {
            if (type === typeRefresh) {
                dispatch(
                    fetchRefreshOpenRes({
                        limit,
                        state: 'open',
                    }),
                )
            }

            if (type === typeLoadMore) {
                dispatch(
                    fetchLoadMoreOpenRes({
                        limit,
                        state: 'open',
                        skip: restaurants.length,
                    }),
                )
            }
        }
    }

    useEffect(() => {
        handleGetData(typeRefresh)
    }, [])

    return (
        <React.Fragment>
            <BoundaryScreen>
                <HeaderSecondary
                    iconNotify={<CartNotify />}
                    title='Open Restaurants'
                    handlePressBack={handlePressBack}
                />

                <FlatList
                    data={restaurants}
                    renderItem={({ item }) => (
                        <CardRestaurant
                            {...item}
                            categories={item.categories
                                .map((item) => item.categoryName)
                                .join('-')}
                            imageURI={item.image.path}
                        />
                    )}
                    keyExtractor={(item) => item._id.toString()}
                    numColumns={1}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.2}
                    onEndReached={() => handleGetData(typeLoadMore)}
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={() => handleGetData(typeRefresh)}
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
                    style={styles.flatlist}
                />
            </BoundaryScreen>
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    flatlist: {
        width: '92%',
    },
})
export default OpenRestaurants
