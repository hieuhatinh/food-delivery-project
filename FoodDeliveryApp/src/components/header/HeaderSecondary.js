import { StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native'

import BoundaryIcon from '../../components/button/BoundaryIcon'
import { global } from '../../global'

const HeaderSecondary = ({ children, iconRightFirst, iconRightSecond }) => {
    const navigation = useNavigation()

    const handlePressBack = () => {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <BoundaryIcon handlePress={handlePressBack}>
                    <Icon name='chevron-left' size={20} />
                </BoundaryIcon>
                {children}
            </View>
            <View style={styles.row}>
                {iconRightFirst && (
                    <BoundaryIcon
                        backgroundColor={iconRightFirst.backgroundColor}
                    >
                        <Icon
                            name={iconRightFirst.name}
                            size={20}
                            color={iconRightFirst.backgroundColor && 'white'}
                        />
                    </BoundaryIcon>
                )}
                {iconRightSecond && (
                    <BoundaryIcon>
                        <Icon name={iconRightSecond.name} size={20} />
                    </BoundaryIcon>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '95%',
        paddingBottom: 10,
        height: global.headerHeight,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
})

export default HeaderSecondary
