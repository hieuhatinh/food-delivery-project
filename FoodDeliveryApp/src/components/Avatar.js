import { Image, StyleSheet } from 'react-native'

const Avatar = () => {
    return (
        <Image
            source={require('../assets/images/avatar.jpeg')}
            style={styles.avatar}
        />
    )
}

const styles = StyleSheet.create({
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 100,
        overflow: 'hidden',
        resizeMode: 'cover',
    },
})

export default Avatar
