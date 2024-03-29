import { Text, View, StyleSheet } from 'react-native'

export default function KeyWords({ name, marginLeft }) {
    return (
        <View style={[styles.tips, { marginLeft: marginLeft }]}>
            <Text>{name}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    tips: {
        width: 90,
        height: 50,
        borderWidth: 3,
        borderColor: '#EDEDED',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
})
