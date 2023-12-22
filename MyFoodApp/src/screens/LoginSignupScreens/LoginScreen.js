import React,{useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
// import { titles } from '../../globals/style';
import {colors, titles, btn1, hr80} from '../../globals/style';
import { FontAwesome5, Octicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { FontAwesome5 } from '@expo/vector-icons';
// import { FontAwesome5 } from '@expo/vector-icons';
import "firebase/compat/auth";
import 'firebase/compat/firestore';
import {firebase} from '../../../Firebase/firebaseConfig';

const LoginScreen = ({navigation}) => {

    const [emailFocus, setEmailFocus]  = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [email ,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [customError, setcustomError] = useState('');

    const handleLogin = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            console.log('Logged in successfully');
            // console.log(user);
            navigation.navigate('welcomepage');
        })
        .catch((error) => {
            var errorMessage = error.message;
            // console.log(errorMessage);
            if (errorMessage === 'Firebase: The email address is badly formatted. (auth/invalid-email).'
                ) {
                    setcustomError('Please enter a valid email address')
                }
                else {
                    setcustomError('Incorrect email or password')
                }
        })
    }

    return(
        <View style={styles.container}>
            <Text style={styles.head1}>Sign In</Text>

            {
                customError !== '' && <Text style={styles.errormsg}>{customError}</Text>
            }
    
            
            <View style={styles.inputout}>
                
                <MaterialCommunityIcons name="email-outline" size={24} color={emailFocus === true  ? colors.text1 : colors.text2 } />
                <TextInput style={styles.input} underlineColorAndroid={"transparent"} placeholder='Email' 
                onFocus={() => {
                    setEmailFocus(true);
                    setPasswordFocus(false);
                    setShowPassword(false);
                    setcustomError('');
                }}
                 onChangeText={(text) => setEmail(text)}
                />
            </View>
            <View style={styles.inputout}>
                <Feather name="lock" size={24} color={passwordFocus === true ? colors.text1 : colors.text2} />
                <TextInput style={styles.input} placeholder='Password' 
                onFocus={ () => {
                    setEmailFocus(false);
                    setPasswordFocus(true);
                    setcustomError('');
                }}
                secureTextEntry={showPassword === false ? true : false}
                onChangeText={(text) => setPassword(text)}
                />

                <Octicons name={showPassword == false ?"eye-closed" :"eye" } size={24} color="black"  
                onPress={() => {setShowPassword(!showPassword)}}/>
            </View>
            <TouchableOpacity style={btn1} onPress={() => handleLogin()}>
                <Text style={{color:colors.col1, fontSize: titles.btntext, fontWeight:'bold'}}>Sign In</Text>
            </TouchableOpacity>

             <Text style={styles.forgot}>Forgot Password</Text>
             <Text style={styles.or}>OR</Text>
             <Text style={styles.gftext}>Sing In With</Text>
        
            <View style={styles.gf}>
                <TouchableOpacity>
                    <View style={styles.gficon}>
                    <FontAwesome5 name="google" size={24} color="black" />
                    </View>
                </TouchableOpacity>
                 <TouchableOpacity>
                        <View style={styles.gficon}>
                        <FontAwesome5 name="facebook-f" size={24} color="black" />
                        </View>
                 </TouchableOpacity>
                
            </View>

            <View style={hr80}></View>

            <Text>Don't have an account ?
                <Text style={styles.signup} onPress={() => navigation.navigate('signup')}>    Sign Up</Text>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create ( {
    container: {
        flex:1,
         widht: '100%',
        //  justifyContent:'center',
         alignItems:'center',
         marginTop:60,
    },
    head1: {
        fontSize: titles.title1,
        color : colors.text1,
        textAlign:'center',
        marginVertical: 10,
    },
    inputout: {
        flexDirection: 'row',
        width: '80%',
        marginVertical: 10,
        // backgroundColor: colors.col1,
        backgroundColor:'grey',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        elevation: 20,
    },
    input : {
        fontSize: 18,
        marginLeft: 10,
        width: '80%',
    },
    forgot : {
        color: colors.text2,
        marginTop: 20,
        marginBottom:10,
    },
    or : {
        color: colors.text1,
        marginVertical:10,
        fontWeight:'bold',
    },
    gftext : {
        color : colors.text2,
        marginVertical: 10,
        fontSize:25,
    },
    gf: {
        flexDirection:'row',

    },
    gficon: {
        backgroundColor:'gray',
        width: 50,
        margin: 10,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        elevation: 20,
    },
    signup : {
        color: colors.text1,

    },
    errormsg: {
        color: 'red',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 10,
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    },
})

export default LoginScreen;