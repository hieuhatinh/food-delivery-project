import React from 'react'
import { FlatList, StyleSheet, Text } from 'react-native'
import { useRoute } from '@react-navigation/native'

import HeaderSecondary from '../../components/header/HeaderSecondary'
import BoundaryScreen from '../../components/BoundaryScreen'
import CardMeal from '../../components/Card/CardMeal'
import CartNotify from '../../components/icon/CartNotify'

const ResultByName = () => {
    const route = useRoute()

    return (
        <BoundaryScreen>
            <HeaderSecondary
                iconNotify={<CartNotify />}
                title={route.params.title}
            />

            <FlatList
                data={route.params.data}
                renderItem={({ item }) => <CardMeal {...item} />}
                keyExtractor={(item) => item._id}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                style={styles.flatlist}
            />
        </BoundaryScreen>
    )
}

const styles = StyleSheet.create({
    flatlist: {
        width: '95%',
    },
})
export default ResultByName
