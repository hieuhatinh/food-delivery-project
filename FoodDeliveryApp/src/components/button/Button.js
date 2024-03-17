import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const Button = ({
    height,
    outline,
    title,
    titleColor,
    handlePress,
    backgroundColor,
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.container,
                height && { height: height },
                outline && styles.containerOutline,
                backgroundColor && { backgroundColor: backgroundColor },
            ]}
            onPress={handlePress}
            activeOpacity={0.9}
        >
            <Text
                style={[
                    styles.title,
                    outline && { color: '#ff7622' },
                    titleColor && { color: titleColor },
                ]}
            >
                {title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerOutline: {
        backgroundColor: '#fff',
        borderColor: '#ff7622',
        borderWidth: 1,
    },
    title: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
})

export default Button
