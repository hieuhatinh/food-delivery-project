import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

export default function SocialLogin({
    socialPlatform,
    isDisabled,
    iconName,
    logo,
}) {
    return (
        <TouchableOpacity
            style={styles.boxLink}
            disabled={isDisabled}
            // onPress={() => Linking.openURL('https://www.facebook.com/')}
        >
            <View style={styles.iconLink}>
                {iconName && <Icon name={iconName} size={30} color='#1877f2' />}
                {logo}
                <Text style={styles.textLink}>
                    Connect with {socialPlatform}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    boxLink: {
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#9F9F9F',
        alignItems: 'center',
        height: 53,
        justifyContent: 'center',
        marginVertical: 10,
    },
    iconLink: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textLink: {
        fontWeight: '600',
        marginLeft: 10,
    },
})