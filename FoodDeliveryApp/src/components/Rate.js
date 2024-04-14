import { StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome6'

import { global } from '../global'

const Rate = ({ star = 4.7, deliveryCost = 'Free', minute = '20 minute' }) => {
    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <Icon name='star' color={global.primaryColor} size={20} />
                <Text>{star}</Text>
            </View>
            <View style={styles.info}>
                <Icon name='truck-fast' color={global.primaryColor} size={20} />
                <Text>{deliveryCost}</Text>
            </View>
            <View style={styles.info}>
                <Icon name='clock' color={global.primaryColor} size={20} />
                <Text>{minute}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 30,
        marginTop: 10,
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
})

export default Rate
