import React from 'react'
import { FlatList, StyleSheet, Text } from 'react-native'
import { useSelector } from 'react-redux'

import HeaderSecondary from '../components/header/HeaderSecondary'
import BoundaryScreen from '../components/BoundaryScreen'
import CardCategory from '../components/Card/CardCategory'
import CartNotify from '../components/icon/CartNotify'
import Loading from '../components/Loading'

import { selectCategories } from '../store/selector/categorySelector'

const AllCategories = () => {
    const categoriesState = useSelector(selectCategories)

    return (
        <React.Fragment>
            {categoriesState.isLoading ? (
                <Loading />
            ) : (
                <BoundaryScreen>
                    <HeaderSecondary
                        iconNotify={<CartNotify />}
                        title='All Categories'
                    />

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
    flatlist: {
        width: '95%',
    },
})
export default AllCategories
