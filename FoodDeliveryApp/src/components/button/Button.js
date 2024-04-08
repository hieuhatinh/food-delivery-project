import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { global } from '../../global'

const Button = ({
    height,
    outline,
    title,
    handlePress,
    disabled,
    backgroundColor,
}) => {
    return (
        <View style={{ alignItems: 'center' }}>
            <TouchableOpacity
                style={[
                    styles.container,
                    height && { height: height },
                    outline && styles.containerOutline,
                    backgroundColor && { backgroundColor: backgroundColor },
                    !!disabled && styles.disabled,
                ]}
                onPress={handlePress}
                activeOpacity={0.9}
                disabled={disabled}
            >
                <Text
                    style={[
                        styles.title,
                        outline && { color: global.primaryColor },
                    ]}
                >
                    {title}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: global.primaryColor,
        width: '100%',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerOutline: {
        backgroundColor: '#fff',
        borderColor: global.primaryColor,
        borderWidth: 1,
    },
    title: {
        color: '#fff',
        fontSize: 16,
        textTransform: 'none',
    },
    disabled: {
        backgroundColor: global.disabled,
    },
})

export default Button
