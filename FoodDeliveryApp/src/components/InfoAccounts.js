import { View,StyleSheet,Image,Text } from "react-native";
import React from "react";
const InfoAccounts =({title}) =>{
    return(
        <View style={styles.box}>
        <Image source ={require('../assets/Avatar.png')} style={{height:100, width:100 ,marginRight:20}}></Image>
        <View>
            <Text>{title}</Text>
            <Text>I love fast food</Text>
        </View>
         </View>

    );

}
const styles = StyleSheet.create({
    box:{
        flexDirection:"row",
        justifyContent:'flex-start',
        alignItems:'center',
        marginTop:40,
        marginLeft:30
    }

})
export default InfoAccounts