import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { global } from '../../global'

const BoundaryIcon = ({ children, backgroundColor, size, handlePress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            {children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: global.backgroundPrimaryColor,
        width: 45,
        height: 45,
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default BoundaryIcon
