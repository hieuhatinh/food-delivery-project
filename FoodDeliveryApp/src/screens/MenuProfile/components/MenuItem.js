import React from 'react'
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const MenuItem = ({ onPress, title, iconName, colorIcon }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.6}
            style={styles.button}
            onPress={onPress}
        >
            <View style={styles.boxIcon}>
                <Icon
                    style={styles.icon}
                    name={iconName}
                    size={15}
                    color={colorIcon}
                />
            </View>
            <Text style={styles.title}>{title}</Text>

            <View style={styles.iconRight}>
                <Icon
                    style={[styles.icon, { backgroundColor: '#f0f5fa' }]}
                    name='angle-right'
                    size={24}
                    color='#707073'
                />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 12,
    },
    boxIcon: {
        width: 40,
        height: 40,
        backgroundColor: 'white',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        justifyContent: 'center',
        // backgroundColor:'#f0f5fa',
        textAlign: 'center',
        lineHeight: 30,
    },
    title: {
        color: 'black',
        fontSize: 16,
        textAlign: 'left',
        marginLeft: 20,
    },
    iconRight: {
        position: 'absolute',
        right: 10,
    },
})
export default MenuItem
