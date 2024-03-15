import { StyleSheet, Text, View,Image,Button } from 'react-native'
import React from 'react'
import My_Button from '../components/My_Button'
export default function home({navigation}) {
    return (
        <View style={styles.container}>
            <Image source={require  ('../assets/Home.png') } style={styles.images}></Image>
            
            <Text style = {styles.h1} >Welcome to our service</Text>
            <Text style = {styles.h2}>Get all your loved foods in one once place, you just place the order we do the rest</Text>
            <View style = {styles.button}> 
                <My_Button  title='Log in' color = '#ffc929' titleColor='white' onPress={() =>navigation.navigate('Account')}></My_Button>
                <My_Button  title ='Sign up' color = "white" onPress={() => navigation.navigate('')}></My_Button>

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
        gap:50,
        paddingTop:100
    },
    images:{
        marginVertical:50,
        height:200,
        width:200
    },
    h1:{
        fontWeight:"bold",
        fontSize:34,
    },
    h2:{
        fontSize:15,
        textAlign:'center',
        color:"#646982"

    },
    button:{
        gap:20  
    }  
})

