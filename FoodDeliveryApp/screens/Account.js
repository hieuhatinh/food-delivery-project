import React from "react"
import ButtonBack from "../components/ButtonBack"
import { View,StyleSheet,Text,Image,ScrollView } from "react-native"
import Icon_Info from "../components/Icon_Info"
import ButtonMenu from "../components/ButtonMenu"

const Account =({navigation}) =>{
    return(
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <ButtonBack  goBack = {navigation.goBack}></ButtonBack>
                <Text style={{fontSize:20}}>Menu Profile</Text>
                <ButtonMenu></ButtonMenu>
            </View>
            <View style={styles.box}>
                <Image source ={require('../assets/Avatar.png')} style={styles.image}></Image>
                <View >
                    <Text style={{fontSize:20,fontWeight:"bold"}}>Septa</Text>
                    <Text style={{color:'#a0a5ba',marginTop:10}}>I love fast food</Text>
                </View>
            </View>
            <ScrollView style={styles.Scrollmenu}>
                <View style={styles.boxIcon}>
                    <Icon_Info title='Personal Info' iconName='user-o' colorIcon='red'     onPress={() =>navigation.navigate('Account')}/>
                    <Icon_Info title='Addresses'     iconName='map-o'  colorIcon='#3f3cfa' onPress={() =>navigation.navigate('Account')}/>
                </View>

                <View style={styles.boxIcon}>
                    <Icon_Info title='Cart'           iconName='id-card-o'   colorIcon='#369aff' onPress={() =>navigation.navigate('Account')}/>
                    <Icon_Info title='Favourite'      iconName='heart-o'     colorIcon='#b13cfa' onPress={() =>navigation.navigate('Account')}/>
                    <Icon_Info title='Notifications'  iconName='bell-o'      colorIcon='#ffa929' onPress={() =>navigation.navigate('Account')}/>
                    <Icon_Info title='Payment Method' iconName='cc-visa'     colorIcon='#82c1ff' onPress={() =>navigation.navigate('Account')}/>
                </View>

                <View style={styles.boxIcon}>
                    <Icon_Info title='FAQs'        iconName='tag'   colorIcon='#fc9a77' onPress={() =>navigation.navigate('Account')}/>
                    <Icon_Info title='User Reviews'iconName='odnoklassniki'     colorIcon='#2be0e0' onPress={() =>navigation.navigate('Account')}/>
                    <Icon_Info title='Settings'    iconName='gear'      colorIcon='#8886fc' onPress={() =>navigation.navigate('Account')}/>
                </View>

                <View style={styles.boxIcon}>
                    <Icon_Info title='Log Out'           iconName='sign-out'   colorIcon='#fa4857' onPress={() =>navigation.navigate('Account')}/>
                </View>
                <Text style={{height:50}} ></Text>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:50,
        paddingHorizontal:20

    },
    containerHeader:{
        flexDirection:"row",
        alignItems:'center',
        justifyContent:'space-between',
        width:'100%',
    },
    box:{
        flexDirection:"row",
        justifyContent:'flex-start',
        alignItems:'center',
        marginTop:40,
        marginLeft:20
    },
    boxIcon:{
        backgroundColor:'#f0f5fa',
        borderRadius:10,
        marginTop:30
    },
    Scrollmenu: {
        paddingVertical: 20,
        paddingBottom:10
    },
    image:{
        height:100, 
        width:100 ,
        marginRight:40,
        borderRadius:50
    }
})
export default Account