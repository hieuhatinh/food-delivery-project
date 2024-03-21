import { Button, StyleSheet, Text, View } from 'react-native'

const Notification = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={{ color: 'red' }}>
                Chức năng này đang được phát triển.
            </Text>
            <Text style={{ color: 'red' }}> Vui lòng quay trở lại sau.</Text>
            <Button
                title='Go back Menu Profile'
                onPress={() => navigation.goBack()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
})

export default Notification
