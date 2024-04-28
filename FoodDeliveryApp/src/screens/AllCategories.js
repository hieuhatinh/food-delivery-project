import React, { useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import HeaderSecondary from '../components/header/HeaderSecondary'
import BoundaryScreen from '../components/BoundaryScreen'
import CardCategory from '../components/Card/CardCategory'
import CartNotify from '../components/icon/CartNotify'
import Loading from '../components/Loading'

import { selectCategories } from '../store/selector/categorySelector'
import { fetchLoadMoreGetCategories, fetchRefreshGetCategories } from '../store/actions/categoryAction'
import { limitCategories, typeLoadMore, typeRefresh } from '../utils/configLoadData'
import { reStopLoadMore } from '../store/slice/categoriesSlice'

const AllCategories = () => {
    const isFocused = useIsFocused()

    const dispatch = useDispatch()
    const { categories, isLoading, isStopLoadMore } =
        useSelector(selectCategories)

    // xử lý loadmore lấy dữ liệu
    const handleGetData = (type) => {
            if (type === typeRefresh) {
                dispatch(reStopLoadMore())
                dispatch(fetchRefreshGetCategories({ limit: limitCategories }))
            }

            if (!isStopLoadMore && type === typeLoadMore) {
                dispatch(
                    fetchLoadMoreGetCategories({
                        limit: limitCategories,
                        skip: categories.length,
                    }),
                )
            }
    }

    useEffect(() => {
        if (isFocused) {
            handleGetData(typeRefresh)
        }
    }, [isFocused])

    return (
        <React.Fragment>
            <BoundaryScreen>
                <HeaderSecondary
                    iconNotify={<CartNotify />}
                    title='All Categories'
                />

                <FlatList
                    data={categories}
                    renderItem={({ item }) => <CardCategory {...item} />}
                    keyExtractor={(item) => item._id}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.2}
                    onEndReached={() => handleGetData(typeLoadMore)}
                    ListFooterComponent={
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
        width: '95%',
    },
})
export default AllCategories
