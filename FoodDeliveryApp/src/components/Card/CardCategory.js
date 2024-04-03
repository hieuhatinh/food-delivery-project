import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function CardCategory(props) {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.9}>
            <View style={[styles.boxFood, styles.shadow]}>
                <Image
                    source={{
                        uri: props.image.path,
                    }}
                    style={styles.imageFood}
                    resizeMode='cover'
                />
            </View>
            <Text style={styles.nameFood}>{props.categoryName}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        flex: 1,
        alignItems: 'center',
    },
    boxFood: {
        width: 135,
        height: 135,
        backgroundColor: 'white',
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
    },
    nameFood: {
        textAlign: 'center',
        paddingTop: 10,
        fontSize: 18,
        fontWeight: '600',
        textTransform: 'capitalize',
    },
    imageFood: {
        width: '85%',
        height: '85%',
        borderRadius: 100,
    },
})
