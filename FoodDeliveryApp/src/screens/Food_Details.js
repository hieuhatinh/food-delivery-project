import React, { useState } from "react";
import { View,StyleSheet,Text,Image, TouchableOpacity } from "react-native";
import BoundaryIcon from '../components/button/BoundaryIcon'
import Icon from 'react-native-vector-icons/Entypo'
import Button from "../components/button/Button";


const size = [
    {id:1,sizeName:'M'},
    {id:1,sizeName:'L'},
    {id:1,sizeName:'XL'},

]
const Food_Details =() =>{
    const [click,setClick] = useState(1);
    const [count, setCount] = useState(0);
    function handleClickPlus() {
      setCount(count + 1);
    }
    function handleClickMinus() {
        setCount(count - 1);
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

            <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
                <Text style={{fontSize:13}}>Size:</Text>
                {size.map((item) =>(
                    <BoundaryIcon  key={item.id} >
                        <Text>{item.sizeName}</Text>
                    </BoundaryIcon>
                ))}
            </View>
            <View style={styles.box}>
                <View style={styles.boxP1}>
                    <Text style={{fontSize:28}}>$32</Text>
                    <View style={styles.buttonClick}>
                        <TouchableOpacity onPress={handleClickPlus}> 
                            <Icon name="circle-with-plus" size={25}  style={styles.icon}/>
                        </TouchableOpacity>
                        <Text style={{color:'white'}}>  {count}  </Text>
                        <TouchableOpacity onPress={handleClickMinus}> 
                            <Icon name="circle-with-minus" size={25} style={styles.icon}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <Button title='ADD TO CART' ></Button>

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
    },
    box:{
        backgroundColor:'#f0f5fa',
        borderRadius:20,
        marginTop:200
    },
    boxP1:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    buttonClick:{
        flexDirection:'row',
        backgroundColor:'black',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:50,
        gap:13,
        height:50,
        width:130,
        margin:15
    },
    icon:{
        color:'white'
    }
})
export default Food_Details