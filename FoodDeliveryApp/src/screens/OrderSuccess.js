import { Image, StyleSheet, Text, View } from 'react-native'

import Button from '../components/button/Button'
import BoundaryScreen from '../components/BoundaryScreen'

export default function OrderSuccess({ navigation }) {
    return (
        <BoundaryScreen>
            <View style={styles.container}>
                <View style={styles.box}>
                    <Image
                        source={require('../assets/images/icon_correct_.png')}
                    />
                </View>

                <Text style={styles.title}> Order Success</Text>
                <View style={styles.boxbtn}>
                    <View style={styles.widthBtn}>
                        <Button
                            height={40}
                            outline={true}
                            title={'Home'}
                            handlePress={() =>
                                navigation.navigate('BottomTabs')
                            }
                        />
                    </View>
                    <View style={styles.widthBtn}>
                        <Button
                            height={40}
                            title={'My order'}
                            handlePress={() => navigation.navigate('MyOrder')}
                        />
                    </View>
                </View>
            </View>
        </BoundaryScreen>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        width: 140,
        height: 140,
        backgroundColor: '#F0F5FA',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        position: 'absolute',
        top: 200,
    },
    title: {
        fontSize: 24,
    },
    boxbtn: {
        width: '100%',
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    widthBtn: {
        width: 150,
    },
})
