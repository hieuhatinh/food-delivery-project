import React from "react"
import {StyleSheet,TouchableOpacity } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome'
const ButtonMenu =({goBack}) =>{
    return(
        <TouchableOpacity style={styles.buttonBack} onPress={goBack}>
            <Icon name='ellipsis-h' size={25}></Icon>
        </TouchableOpacity>
   
    );

}
const styles = StyleSheet.create ({
    buttonBack:{
        height:40,
        width:40,
        borderRadius:50,
        backgroundColor:"#d6d5d4",
        justifyContent:'center',
        alignItems:'center'
    },


}) 
export default ButtonMenu