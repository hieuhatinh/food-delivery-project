import React from "react"
import { TouchableOpacity,View,Text,StyleSheet } from "react-native"
const My_Button = ({onPress,title,color,titleColor}) =>{
    return(
        <TouchableOpacity style = {[styles.button ,{backgroundColor:color} ]} onPress={onPress} >
            <Text style = {[styles.title,{color:titleColor}]}>{title}</Text>
        </TouchableOpacity>
        
    );
}
const styles = StyleSheet.create ({
    button:{
        paddingVertical:30,
        borderRadius:12,
        paddingHorizontal:20,
        width:350
    },
    title:{
        textAlign:"center",
        fontWeight:"bold",
        fontSize:16
    }

})
export default My_Button