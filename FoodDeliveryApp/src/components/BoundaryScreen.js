import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const BoundaryScreen = ({ children }) => {
    const insets = useSafeAreaInsets()

    return (
        <View
            style={[
                styles.container,
                {
                    paddingTop: insets.top + 10,
                    paddingBottom: insets.bottom,
                    paddingLeft: insets.left,
                    paddingRight: insets.right,
                },
            ]}
        >
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
})

export default BoundaryScreen
