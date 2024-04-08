import React, { useState } from "react";
import { View,StyleSheet,Text,Image } from "react-native";
import BoundaryIcon from '../components/button/BoundaryIcon'
import Icon from 'react-native-vector-icons/Entypo'
import Button from "../components/button/Button";
const Food_Details =() =>{
    const [click,setClick] = useState(false);
    const changeColor =() => {
        setClick(true)
    }

    return (
        <View style= {styles.container}>
            <View style={styles.boxHeader}>
                <BoundaryIcon>
                    <Icon name="chevron-small-left" size={30}></Icon>
                </BoundaryIcon>
                <Text style={{fontSize:20}}>Details</Text>
            </View>
            <Image source={require('../assets/images/Heading Image.png')}style={{width:397,borderRadius:20,marginTop:30}}></Image>
            <View style={styles.buttonUttoraCoffeeHouse}>
                <Image source={require('../assets/images/Ellipse 1295.png')}/>
                <Text style={{fontSize:14}}>Uttora Coffee House</Text>
            </View>
            <Text style={{fontSize:20,fontWeight:'bold'}}>Chicken & Chips</Text>
            <Text style={{color:'#a0a5ba',width:350}}>Prosciutto e funghi is a pizza variety that is topped with tomato sauce.</Text>
            <View>
                <Text style={{fontSize:13}}>Size:</Text>
                <BoundaryIcon handlePress={changeColor}>
                    <Text>M</Text>
                </BoundaryIcon>
            </View>
            

        </View>

    )

}
const styles= StyleSheet.create({
    container:{
        flex:1,
        marginTop:30,
        left:10,
        gap:10

    },
    boxHeader:{
        flexDirection:'row',
        alignItems:'center',
        gap:20

    },
    buttonUttoraCoffeeHouse:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:10,
        padding:14,
        gap:10,
        width:190,
        borderWidth:1,
        borderRadius:20,
        borderColor:'#e8e8e8'
    }

})
export default Food_Details