import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text } from 'react-native'

import HeaderSecondary from '../components/header/HeaderSecondary'
import BoundaryScreen from '../components/BoundaryScreen'
import CardCategory from '../components/Card/CardCategory'
import CartNorify from '../components/icon/CartNotify'
import Loading from '../components/Loading'
import axiosClient from '../api/axiosClient'

const AllCategories = () => {
    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState([])

    useEffect(() => {
        async function fetchCategories() {
            let categories = await axiosClient.get('/category/get-categories')
            if (categories.status === 200) {
                setCategories(categories.data.categories)
                setLoading(false)
            }
        }

        const idTimeout = setTimeout(() => {
            fetchCategories()
        }, 2000)

        return () => clearTimeout(idTimeout)
    }, [])

    return (
        <React.Fragment>
            {loading ? (
                <Loading />
            ) : (
                <BoundaryScreen>
                    <HeaderSecondary iconNotify={<CartNorify />}>
                        <Text style={styles.title}>All Categories</Text>
                    </HeaderSecondary>

                    <FlatList
                        data={categories}
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
