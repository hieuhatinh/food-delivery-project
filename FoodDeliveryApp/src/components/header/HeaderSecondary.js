import { StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native'

import BoundaryIcon from '../../components/button/BoundaryIcon'
import { global } from '../../global'

const HeaderSecondary = ({
    children,
    title,
    iconLeft = true,
    iconRightFirst,
    iconRightSecond,
    iconNotify,
}) => {
    const navigation = useNavigation()

    const handlePressBack = () => {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                {iconLeft && (
                    <BoundaryIcon handlePress={handlePressBack}>
                        <Icon name='chevron-left' size={20} />
                    </BoundaryIcon>
                )}
                {children}
                {!!title && <Text style={styles.title}>{title}</Text>}
            </View>
            <View style={styles.row}>
                {iconRightFirst && (
                    <BoundaryIcon
                        backgroundColor={iconRightFirst.backgroundColor}
                        handlePress={iconRightFirst.handlePress}
                    >
                        <Icon
                            name={iconRightFirst.name}
                            size={20}
                            color={iconRightFirst.backgroundColor && 'white'}
                        />
                    </BoundaryIcon>
                )}
                {!!iconRightSecond && (
                    <BoundaryIcon>
                        {iconRightSecond?.name && (
                            <Icon name={iconRightSecond.name} size={20} />
                        )}
                    </BoundaryIcon>
                )}
                {!!iconNotify && iconNotify}
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
        zIndex: 100,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
})

export default HeaderSecondary
