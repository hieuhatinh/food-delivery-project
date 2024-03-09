import {
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native'
import { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/FontAwesome6'

import Button from '../../component/button/Button'
import HeaderSecondary from '../../component/header/HeaderSecondary'
import Avatar from '../../component/Avatar'
import { global } from '../../global'

const EditInformation = () => {
    const insets = useSafeAreaInsets() // safe area view

    // dropdown list item sex
    const [isOpen, setIsOpen] = useState(false)

    const items = [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'Other' },
    ]

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    const handlePressOutside = () => {
        setIsOpen(false)
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
            <TouchableWithoutFeedback onPress={handlePressOutside}>
                <KeyboardAvoidingView
                    style={styles.keyBoardAvoidingView}
                    behavior='padding'
                >
                    <HeaderSecondary title='Edit Information' />
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={styles.content}
                    >
                        <View style={styles.viewAvatar}>
                            <Avatar />
                        </View>

                        <View>
                            <Text style={styles.titlePart}>Information</Text>
                            <View style={styles.viewInformation}>
                                <View style={styles.viewEditInfo}>
                                    <Text style={styles.text}>Full name:</Text>
                                    <TextInput
                                        value='Nguyễn Trung Hiếu'
                                        style={styles.textInput}
                                    />
                                    <Icon name='pencil' size={15} />
                                </View>

                                {/* sex */}
                                <View
                                    style={[
                                        styles.viewEditInfo,
                                        { zIndex: 100 },
                                    ]}
                                >
                                    <Text style={styles.text}>Sex:</Text>
                                    <TouchableOpacity
                                        style={[
                                            styles.textInput,
                                            styles.dropdown,
                                        ]}
                                        activeOpacity={0.9}
                                        onPress={toggleDropdown}
                                    >
                                        <Text style={styles.textDropdown}>
                                            Male
                                        </Text>
                                        <Icon name='chevron-down' size={10} />
                                        {isOpen && (
                                            <View style={styles.dropdownMenu}>
                                                {items.map((item) => (
                                                    <TouchableOpacity
                                                        key={item.value}
                                                        style={
                                                            styles.dropdownItem
                                                        }
                                                    >
                                                        <Text>
                                                            {item.label}
                                                        </Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                    <Icon name='user-tag' size={15} />
                                </View>

                                <View style={styles.viewEditInfo}>
                                    <Text style={styles.text}>
                                        Date of birth:
                                    </Text>
                                    <TextInput
                                        value='22/12/2001'
                                        style={styles.textInput}
                                    />
                                    <Icon name='calendar-alt' size={15} />
                                </View>

                                <View style={styles.viewEditInfo}>
                                    <Text style={styles.text}>
                                        Phone number:
                                    </Text>
                                    <TextInput
                                        value='0342648465'
                                        style={styles.textInput}
                                    />
                                    <Icon name='phone' size={15} />
                                </View>

                                <View style={styles.viewEditInfo}>
                                    <Text style={styles.text}>Address:</Text>
                                    <TextInput
                                        value='123 NewYork USA'
                                        style={styles.textInput}
                                    />
                                    <Icon name='map-location' size={15} />
                                </View>
                            </View>
                        </View>

                        <View>
                            <Text style={styles.titlePart}>Slogan</Text>
                            <View style={styles.viewInformation}>
                                <View style={styles.viewEditInfo}>
                                    <TextInput
                                        value='I love fast food'
                                        style={styles.textInput}
                                    />
                                    <Icon name='pencil' size={15} />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    <Button title='Submit' />
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    keyBoardAvoidingView: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        marginVertical: 25,
        width: '90%',
    },
    viewAvatar: {
        alignItems: 'center',
    },
    viewInformation: {
        backgroundColor: global.backgroundPrimaryColor,
        padding: 20,
        borderRadius: 10,
        marginBottom: 25,
        marginTop: 10,
    },
    titlePart: {
        fontWeight: '700',
        fontSize: 18,
    },
    viewEditInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        color: global.textPrimaryColor,
        marginVertical: 10,
    },
    textInput: {
        borderBottomWidth: 1,
        marginLeft: 10,
        marginRight: 15,
        minWidth: 100,
    },

    // dropdown
    dropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    textDropdown: {
        flex: 1,
    },
    dropdownMenu: {
        backgroundColor: '#fff',
        padding: 10,
        position: 'absolute',
        width: '100%',
        top: 20,
        left: 0,
        right: 0,
        display: 'flex',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    dropdownItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
})

export default EditInformation
