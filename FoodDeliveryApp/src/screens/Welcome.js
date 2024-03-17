import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Button from '../components/button/Button'

export default function Welcome({ navigation }) {
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/logo.jpg')}
                style={styles.images}
            />

            <Text style={styles.h1}>Welcome to our service</Text>
            <Text style={styles.h2}>
                Get all your loved foods in one once place, you just place the
                order we do the rest
            </Text>
            <View style={styles.button}>
                <Button
                    title='Log in'
                    backgroundColor='#FFCA28'
                    // titleColor='white'
                    height={75}
                    onPress={() => navigation.navigate('Account')}
                />
                <Button
                    title='Sign up'
                    outline
                    height={75}
                    onPress={() => navigation.navigate('')}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
    },
    images: {
        marginBottom: 10,
        height: 300,
        width: 300,
    },
    h1: {
        fontWeight: 'bold',
        fontSize: 24,
    },
    h2: {
        fontSize: 16,
        textAlign: 'center',
        color: '#646982',
        fontWeight: '500',
    },
    button: {
        gap: 30,
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
})
