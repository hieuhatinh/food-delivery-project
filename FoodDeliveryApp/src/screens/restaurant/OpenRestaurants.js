import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'

import HeaderSecondary from '../../components/header/HeaderSecondary'
import BoundaryScreen from '../../components/BoundaryScreen'
import CardRestaurant from '../../components/Card/CardRestaurant'
import CartNotify from '../../components/icon/CartNotify'
import Loading from '../../components/Loading'

import { fetchOpenRes } from '../../store/actions/restaurantAction'
import { selectRestaurants } from '../../store/selector/restaurantSelector'

const OpenRestaurants = () => {
    const dispatch = useDispatch()
    const isFocused = useIsFocused()
    const restaurantsState = useSelector(selectRestaurants)

    useEffect(() => {
        if (isFocused) {
            dispatch(fetchOpenRes({ limit: undefined, state: 'open' }))
        }
    }, [isFocused])

    return (
        <React.Fragment>
            {restaurantsState.isLoading ? (
                <Loading />
            ) : (
                <BoundaryScreen>
                    <HeaderSecondary iconNotify={<CartNotify />}>
                        <Text style={styles.title}>Open Restaurants</Text>
                    </HeaderSecondary>

                    <FlatList
                        data={restaurantsState.restaurants}
                        renderItem={({ item }) => (
                            <CardRestaurant
                                {...item}
                                categories={item.categories
                                    .map((item) => item.categoryName)
                                    .join('-')}
                                imageURI={item.image.path}
                            />
                        )}
                        keyExtractor={(item) => item._id}
                        numColumns={1}
                        showsVerticalScrollIndicator={false}
                        style={styles.flatlist}
                    />
                </BoundaryScreen>
            )}
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: '600',
    },
    flatlist: {
        width: '92%',
    },
})
export default OpenRestaurants
