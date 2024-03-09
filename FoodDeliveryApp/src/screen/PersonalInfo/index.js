import { Image, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

import Button from '../../component/button/Button'
import HeaderSecondary from '../../component/header/HeaderSecondary'
import Avatar from '../../component/Avatar'
import { global } from '../../global'

const PersonalInfo = () => {
    const insets = useSafeAreaInsets()

    const navigation = useNavigation()

    const handlePressEdit = () => {
        navigation.navigate('EditInformation')
    }

    return (
        <View
            style={[
                styles.container,
                {
                    paddingTop: insets.top + 10,
                    paddingBottom: insets.bottom + 20,
                    paddingLeft: insets.left,
                    paddingRight: insets.right,
                },
            ]}
        >
            <HeaderSecondary title='Personal Information' />
            <View style={styles.content}>
                <View style={styles.introduce}>
                    <Avatar />
                    <View style={styles.info}>
                        <Text style={styles.textName}>Hiếu</Text>
                        <Text style={styles.textSlogan}>I love fast food</Text>
                    </View>
                </View>
                <View style={styles.information}>
                    <Text style={styles.text}>
                        Full name: Nguyễn Trung Hiếu
                    </Text>
                    <Text style={styles.text}>Sex: Male</Text>
                    <Text style={styles.text}>Age: 25</Text>
                    <Text style={styles.text}>Phone number: 097652423</Text>
                    <Text style={styles.text}>Address: 123 NewYork USA</Text>
                </View>
            </View>
            <Button title='Edit Information' handlePress={handlePressEdit} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        marginVertical: 25,
        width: '90%',
    },
    introduce: {
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
        marginLeft: 30,
    },
    textName: {
        fontSize: 24,
        color: global.textPrimaryColor,
        fontWeight: '600',
        marginBottom: 10,
    },
    textSlogan: {
        fontSize: 14,
        color: global.textFifthColor,
    },
    information: {
        backgroundColor: global.backgroundPrimaryColor,
        padding: 20,
        borderRadius: 10,
        marginVertical: 25,
    },
    text: {
        fontSize: 16,
        color: global.textPrimaryColor,
        marginVertical: 10,
    },
})

export default PersonalInfo
