import { StyleSheet, TouchableOpacity } from 'react-native'

const BoundaryIcon = ({ children, backgroundColor, size, handlePress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            {children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#d6d5d4',
        width: 45,
        height: 45,
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default BoundaryIcon
