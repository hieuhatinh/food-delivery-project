import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function App() {
    return (
        <View style={styles.container}>
            {/* <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" /> */}
            <Icon name='arrow-left' size={30} color='blue' />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
