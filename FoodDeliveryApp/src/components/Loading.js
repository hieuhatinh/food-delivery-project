import { ActivityIndicator, StyleSheet, View } from 'react-native'

const Loading = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator color='#fff' />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        zIndex: 100,
        opacity: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default Loading
