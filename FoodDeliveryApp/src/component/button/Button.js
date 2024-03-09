import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import { global } from '../../global'

const Button = ({ height, outline, title, handlePress }) => {
    return (
        <TouchableOpacity
            style={[
                styles.container,
                height && { height: height },
                outline && styles.containerOutline,
            ]}
            onPress={handlePress}
            activeOpacity={0.9}
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
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: global.primaryColor,
        width: '80%',
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
        textTransform: 'capitalize',
    },
})

export default Button
