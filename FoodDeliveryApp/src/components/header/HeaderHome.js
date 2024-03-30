import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { global } from '../../global'

const HeaderHome = () => {
    return (
        <View style={styles.container}>
            <View style={styles.headerLeft}>
                <TouchableOpacity activeOpacity={0.9}>
                    <Image
                        style={styles.logo}
                        source={require('../../assets/images/logo.jpg')}
                    />
                </TouchableOpacity>
                <View style={{ marginLeft: 15 }}>
                    <Text style={styles.textWellCome}>WELLCOME TO</Text>
                    <View
                        style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                        }}
                    >
                        <Text style={styles.appName}>FoodShopping</Text>
                    </View>
                </View>
            </View>
            <Icon name='bell-o' size={25} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: '5%',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    logo: {
        height: 50,
        width: 50,
        borderRadius: 100,
    },
    textWellCome: {
        color: global.primaryColor,
        fontWeight: '800',
        fontSize: 15,
        marginBottom: 5,
    },
    appName: {
        color: global.textThirdColor,
    },
})

export default HeaderHome
