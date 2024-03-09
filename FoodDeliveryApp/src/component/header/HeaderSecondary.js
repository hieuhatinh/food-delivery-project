import { StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native'

import BoundaryIcon from '../button/BoundaryIcon'

const HeaderSecondary = ({ title }) => {
    const navigation = useNavigation()

    const handlePressBack = () => {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <BoundaryIcon handlePress={handlePressBack}>
                <Icon name='chevron-left' size={20} />
            </BoundaryIcon>
            <Text style={styles.title}>{title}</Text>
            <BoundaryIcon>
                <Icon name='dots-three-horizontal' size={20} />
            </BoundaryIcon>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
    },
})

export default HeaderSecondary
