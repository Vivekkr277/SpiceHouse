import React,{useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity , Image} from 'react-native';

import welcome8 from '../../../assets/welcome8.png';
import newImage4 from '../../../assets/newImage4.png';
import wellcome from '../../../assets/wellcome.jpg';
import wall2 from '../../../assets/wall2.jpg';
import {colors, hr80} from '../../globals/style';

import "firebase/compat/auth";
import 'firebase/compat/firestore';
import {firebase} from '../../../Firebase/firebaseConfig';


const WelcomeScreen = ({navigation}) => {

     const [userlogged, setUserLogged] = useState(null);
      
     useEffect(() => {
        const checklogin = () => {
            firebase.auth().onAuthStateChanged((user) => {
                if(user) {
                    // console.log(user);
                    setUserLogged(user);
                }
                else{
                    setUserLogged(null);
                    console.log("No user logged in");
                }
            })
        }
        checklogin()
     },[])

     const handleLogout = () => {
        firebase.auth().signOut()
        .then(() => {
            setUserLogged(null);
            console.log('user loged out');
        })
        .catch((error) => {
            console.log(error);
        })

     }

    return(
        // <View style={{flex:1}}>
            <View style={styles.container}>
            
            <Text style={styles.title}>Welcome to PahadiBaba</Text>
            <View style={styles.logoout}>
                <Image source={wall2} style={styles.logo}/>
            </View>
            <View style={hr80}/>
            <Text style={styles.text}>Find the best food around you at lowest price.</Text>
            <View style={hr80}/>

            {
                userlogged == null ? 
                <View style={styles.btnout}>
                <TouchableOpacity onPress={() => navigation.navigate('signup')}>
                    <Text style={styles.btn}>Sign up</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('login')}>
                    <Text style={styles.btn}>Log in</Text>
                </TouchableOpacity>
            </View> 
            :
            <View style={styles.logged}>
               <Text style={styles.txtlog}>Signed in as 
               <Text style={styles.txtlogin}> &nbsp;{ userlogged.email}</Text></Text>
               <View style={hr80}/>
              
            <View style={styles.btnout}>
            <TouchableOpacity onPress={() => navigation.navigate('home')}>
                <Text style={styles.btn}>Go To Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLogout()}>
                <Text style={styles.btn}>Log Out</Text>
            </TouchableOpacity>
            </View> 
               
            </View> 
            }
        </View>
        // {/* </View> */}
        
    )
}

const styles = StyleSheet.create({
    container: {
         flex:1,
         backgroundColor:'green',
         width:'100%',
         justifyContent:'center',
         alignItems:'center',
    },
    title:{
        fontSize: 50,
        color: colors.col1,
        textAlign : 'center',
        marginVertical : 10,
        fontWeight: '600',
    },
    logoout : {
        width: '80%',
        height: '30%',
        backgroundColor:'red',
        alignItems:'center',

    },
    logo :{
        height: '100%',
        width:'100%',
    },
   
    text : {
        fontSize:18,
        width: '80%',
        color: colors.col1,
        textAlign:'center',
    },
    btnout:{
        flexDirection:'row',
    },
    btn: {
        fontSize:20,
        color: colors.text1,
        textAlign: 'center',
        backgroundColor: 'orange',
        margintVertical : 30,
        marginHorizontal: 10,
         fontWeight: '700',
        borderRadius: 10,
        padding: 10,
        paddingHorizontal: 20,

        },
    logged : {
        alignItems: 'center',
    },
    txtlog: {
        fontSize: 18,
        color : colors.col1,
    },
    txtlogin : {
        fontSize: 19,
        color: colors.col1,
        fontWeight: '700',
        textDecorationStyle: 'solid',
        // textDecorationLine: 'underline',
    }    
})

export default WelcomeScreen;