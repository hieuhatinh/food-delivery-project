import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Entypo'
import Button from '../components/button/Button'
import HeaderSecondary from '../components/header/HeaderSecondary'
import BoundaryScreen from '../components/BoundaryScreen'

const EditAddressAndContact = () => {
    const [isedit1, setIsEdit1] = useState(false)
    const [isedit2, setIsEdit2] = useState(false)
    const [isedit3, setIsEdit3] = useState(false)
    const [name, setName] = useState('nguyễn văn A')
    const [phoneNumber, setPhoneNumber] = useState('0987645453')
    const [address, setAddress] = useState('Đại học xây dựng hà nội')

    const editName = () => {
        setIsEdit1(!isedit1)
    }
    const editPhoneNumber = () => {
        setIsEdit2(!isedit2)
    }
    const editAddress = () => {
        setIsEdit3(!isedit3)
    }
    return (
        <BoundaryScreen style={styles.container}>
                <HeaderSecondary iconRightSecond={{
                            name: 'dots-three-horizontal',
                        }}>
                    <Text style = {styles.title}>Địa chỉ giao hàng</Text>
                </HeaderSecondary>
            <View style={styles.box}>
                <View style={{ paddingBottom: 50 }}>
                    <View style={[styles.row, { paddingTop: 35 }]}>
                        <Text>Full Name:</Text>
                        <TextInput
                            maxWidth={200}
                            multiline={true}
                            value={name}
                            editable={isedit1}
                            style={styles.input}
                            onChangeText={(value) => setName(value)}
                        />
                        <Icon name='edit' size={20} onPress={editName} />
                    </View>
                    <View style={styles.row}>
                        <Text>Phone Number:</Text>
                        <TextInput
                            multiline={true}
                            value={phoneNumber}
                            editable={isedit2}
                            style={styles.input}
                            onChangeText={(value) => setPhoneNumber(value)}
                        />
                        <Icon name='edit' size={20} onPress={editPhoneNumber} />
                    </View>
                    <View style={styles.row}>
                        <Text>Address:</Text>
                        <TextInput
                            multiline={true}
                            numberOfLines={3}
                            value={address}
                            editable={isedit3}
                            style={styles.input}
                            onChangeText={(value) => setAddress(value)}
                        />
                        <Icon name='edit' size={20} onPress={editAddress} />
                    </View>
                </View>
            </View>
            <View style={styles.btn}>
                <Button title={'Submit'} />
            </View>
        </BoundaryScreen>
    )
}

export default EditAddressAndContact

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
    },
    box: {
        marginTop: 150,
        backgroundColor: '#F0F5FA',
        borderRadius: 10,
        width: '90%',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 30,
        paddingLeft: 40,
    },
    input: {
        height: 20,
        maxWidth: 200,
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#000000',
        paddingRight: 5,
        marginHorizontal: 10,
    },
    btn: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 50,
    },
})
