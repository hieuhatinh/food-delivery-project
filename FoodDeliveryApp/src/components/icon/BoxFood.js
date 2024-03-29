import { Image, StyleSheet, Text, View } from 'react-native'

export default function BoxFood({ text, image, paddingLeft }) {
    return (
        <View style={[styles.order, { paddingLeft: paddingLeft }]}>
            <View style={[styles.boxFood, styles.shadow]}>
                <Image source={image} style={styles.imageFood} />
            </View>
            <Text style={styles.nameFood}>{text}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    order: {
        paddingRight: 20,
    },
    boxFood: {
        width: 120,
        height: 120,
        backgroundColor: 'white',
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 1,
        shadowRadius: 16.0,
        elevation: 24,
    },
    nameFood: {
        textAlign: 'center',
        paddingTop: 10,
        fontSize: 18,
        fontWeight: '600',
    },
    imageFood: {
        width: '80%',
        height: '80%',
        borderRadius: 100,
    },
})
