import { Image, View, Text, StyleSheet } from 'react-native'

const NoneValuesNotify = ({ image, textNotify }) => {
    return (
        <View style={styles.container}>
            <Image source={image} style={styles.image} />
            <Text style={styles.textNotify}>{textNotify}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 200,
        width: 200,
    },
    textNotify: {
        fontSize: 18,
        color: global.error,
        fontWeight: '500',
    },
})


export default NoneValuesNotify