import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'

import { global } from '../../global'

const HeaderSection = ({ title, handleSeeAll }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.titleSection}>{title}</Text>
            <TouchableOpacity
                style={styles.btnSeeAll}
                activeOpacity={0.5}
                onPress={handleSeeAll}
            >
                <Text style={styles.textSeeAll}>See all</Text>
                <Icon
                    name='chevron-right'
                    size={20}
                    color={global.textFourthColor}
                />
            </TouchableOpacity>
        </View>
    )
}

export default HeaderSection

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleSection: {
        fontSize: 18,
        color: global.textPrimaryColor,
    },
    btnSeeAll: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        paddingRight: 0,
    },
    textSeeAll: {
        fontSize: 14,
        color: global.textPrimaryColor,
    },
})
