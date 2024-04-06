import * as SecureStore from 'expo-secure-store'

const setItem = async (key, value) => {
    await SecureStore.setItemAsync(key, value)
}

const getItem = async (key) => {
    let token = await SecureStore.getItemAsync(key)
    return token
}

const deleteItem = async (key) => {
    await SecureStore.deleteItemAsync(key)
}

export { getItem, setItem, deleteItem }
