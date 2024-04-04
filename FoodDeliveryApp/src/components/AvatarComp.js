import { StyleSheet, View } from 'react-native'
import Avatar from './Avatar'
import { Text } from 'react-native'

const AvatarComp = ({ name, slogan }) => {
    return (
        <View style={styles.container}>
            <Avatar />
            <View style={styles.info}>
                <Text style={styles.textName}>{name}</Text>
                <Text style={styles.textSlogan}>{slogan}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 100,
        overflow: 'hidden',
        resizeMode: 'cover',
    },
    info: {
        flexDirection: 'column',
        marginLeft: 15,
        flex: 1,
    },
    textName: {
        fontSize: 20,
        color: global.textPrimaryColor,
        fontWeight: '600',
        marginBottom: 10,
        marginRight: 10,
    },
    textSlogan: {
        fontSize: 14,
        color: global.textFifthColor,
    },
})

export default AvatarComp
