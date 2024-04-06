import React, { useEffect } from 'react'
import { FlatList, StyleSheet, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'

import HeaderSecondary from '../components/header/HeaderSecondary'
import BoundaryScreen from '../components/BoundaryScreen'
import CardCategory from '../components/Card/CardCategory'
import CartNorify from '../components/icon/CartNotify'
import Loading from '../components/Loading'
import { selectCategories } from '../store/selector'
import { fetchGetCategories } from '../store/actions/categoryAction'

const AllCategories = () => {
    const dispatch = useDispatch()
    const categoriesState = useSelector(selectCategories)
    const isFocused = useIsFocused()

    useEffect(() => {
        // dispatch(setCategories())
        if (isFocused) {
            dispatch(fetchGetCategories({ limit: undefined }))
        }
        // async function fetchCategories() {
        //     let categories = await axiosClient.get('/category/get-categories')
        //     if (categories.status === 200) {
        //         setCategories(categories.data.categories)
        //         setLoading(false)
        //     }
        // }

        // const idTimeout = setTimeout(() => {
        //     fetchCategories()
        // }, 2000)

        // return () => clearTimeout(idTimeout)
    }, [isFocused])

    console.log(categoriesState.isLoading)

    return (
        <React.Fragment>
            {categoriesState.isLoading ? (
                <Loading loading={categoriesState.isLoading} />
            ) : (
                <BoundaryScreen>
                    <HeaderSecondary iconNotify={<CartNorify />}>
                        <Text style={styles.title}>All Categories</Text>
                    </HeaderSecondary>

                    <FlatList
                        data={categoriesState.categories}
                        renderItem={({ item }) => <CardCategory {...item} />}
                        keyExtractor={(item) => item._id}
                        numColumns={2}
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
        width: '95%',
    },
})
export default AllCategories
