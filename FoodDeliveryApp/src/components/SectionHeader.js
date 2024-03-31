import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import { global } from '../global'

const SectionHeader = ({ titleSection, handlePress }) => {
    return (
        <View style={[styles.boxTitle]}>
            <Text style={styles.titleSection}>{titleSection}</Text>
            <TouchableOpacity
                style={styles.btnSeeAll}
                activeOpacity={0.9}
                onPress={handlePress}
            >
                <Text style={styles.seeAll}>See All</Text>
                <Icon
                    name='chevron-right'
                    size={20}
                    style={{ marginLeft: 5 }}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    titleSection: {
        fontSize: 18,
        color: global.textPrimaryColor,
    },
    boxTitle: {
        flexDirection: 'row',
        paddingTop: 20,
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingLeft: 20,
    },
    seeAll: {
        color: global.textPrimaryColor,
        fontSize: 15,
    },
    btnSeeAll: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 20,
    },
})

export default SectionHeader
