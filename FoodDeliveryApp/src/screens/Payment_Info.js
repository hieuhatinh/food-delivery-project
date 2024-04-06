import { Image, StyleSheet, Text, View } from 'react-native'
import BoundaryIcon from '../components/button/BoundaryIcon'
import Icon from 'react-native-vector-icons/Entypo'

export default function Payment_Info({navigation}) {
    return (
        <View style={styles.container}>
            <View style={styles.btn}>
                <BoundaryIcon handlePress={() => navigation.goBack()}>
                    <Icon name='chevron-left' size={20} />
                </BoundaryIcon>
            </View>
            <View style={styles.image}>
                <Image source={require('../assets/images/SadCloud.png')} />
            </View>
            <View style={styles.box}>
                <Text style={styles.title}>
                    Currently we only pay in cash. Please sympathize.
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        position: 'absolute',
        top: 50,
        left: 20,
    },
    image: {
        position: 'absolute',
        top: 170,
    },
    box: {
        width: 280,
        height: 210,
        backgroundColor: '#F0F5FA',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 17,
        paddingHorizontal: 40,
    },
})
