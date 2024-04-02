import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Base64 } from 'js-base64'

// // Hàm chuyển đổi mảng byte sang base64
// const arrayToBase64 = (array) => {
//     let binary = ''
//     const bytes = new Uint8Array(array)
//     const len = bytes.byteLength
//     for (let i = 0; i < len; i++) {
//         binary += String.fromCharCode(bytes[i])
//     }
//     return encodeBase64(binary)
// }

// // Hàm mã hóa base64
// const encodeBase64 = (str) => {
//     return Buffer.from(str, 'binary').toString('base64')
// }

export default function CardCategory(props, { image }) {
    console.log(props.image.file)
    // let base64Data = arrayToBase64(props.image.file.data.data)
    // const buffer = Buffer.from(base64Data, 'base64')
    // console.log(base64Data.join(''))
    // const decodedString = Base64.decode(base64Data.join(''))
    let contentType = props.image.file.contentType
    // const imageURL = `data:${contentType};base64,${decodedString}`

    // const base64Data = arrayBufferToBase64(data.data);
    // const uri = `data:${contentType};base64,${base64Data}`
    const data = props.image.file.data.data
    const base64Data = data.reduce((acc, byte) => {
        console.log(String.fromCharCode(byte))
        return acc + String.fromCharCode(byte)
    }, '')
    const uri = `data:${contentType};base64,${base64Data}`
    console.log(base64Data.length)

    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.9}>
            <View style={[styles.boxFood, styles.shadow]}>
                <Image
                    // source={require('../../assets/images/logo.jpg')}
                    source={{
                        uri: uri,
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
