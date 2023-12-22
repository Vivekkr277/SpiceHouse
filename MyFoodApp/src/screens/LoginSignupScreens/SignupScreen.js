import React,{useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, StatusBar} from 'react-native';
// import { titles } from '../../globals/style';
import {colors, titles, btn1, hr80} from '../../globals/style';
import { FontAwesome5, Octicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { Feather } from '@expo/vector-icons';
// import { FontAwesome5 } from '@expo/vector-icons';
// import { FontAwesome5 } from '@expo/vector-icons';
// import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import 'firebase/compat/firestore';
import {firebase} from '../../../Firebase/firebaseConfig';


const SignupScreen = ({navigation}) => {

    const [nameFocus, setNameFocus] =         useState(false);
    const [emailFocus, setEmailFocus]  =      useState(false);
    const [phoneFocus, setPhoneFocus] =       useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [showPassword, setShowPassword] =   useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [ConfirmPasswordFocus, setConfirmPasswordFocus] = useState(false);
   // taking phone password

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    // console.log(phone);
    // console.log(address);

    const [customError , setCustomError] = useState('');
    const [successmsg , setSuccessmsg] = useState('');

    const handleSignup = () => {
        // const formData = {
           
        // }

        if(password != confirmPassword) {
            setCustomError("Password doesn't match");
            return;
          }
          else if (phone.length != 10) {
            setCustomError("Phone number should be of 10 digit");
          }
          try {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredentials) => {
                // console.log(userCredentials);
                console.log("user created");
                // setSuccessmsg("user created successfully");
               
                if(userCredentials?.user.uid) {
                    const userRef = firebase.firestore().collection('UserData')
                
                    userRef.add({
                        email : email,
                        password : password,
                        // confirmPassowrd : confirmPassword,
                        phone : phone,
                        name : name,
                        address : address,
                        uid: userCredentials?.user.uid,
                    }).then(() => {
                        console.log('data added to firestore');
                        setSuccessmsg("user created successfully");
                    }).catch((error) => {
                        console.log('firebase error', error)
                    })
                }
            })
            .catch((error) => {
                console.log('sign up firebase error' , error.message)
                if (error.message == 'Firebase: The email address is already in use by another account. (auth/email-already-in-use).') {
                    setCustomError('Email already exists')
                }
                else if (error.message == 'Firebase: The email address is badly formatted. (auth/invalid-email).') {
                    setCustomError('Invalid Email')
                }
                else if (error.message == 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
                    setCustomError('Password should be at least 6 characters')
                }
                else {
                    setCustomError(error.message)
                }
            })
          }
          catch(error) {
                console.log('sign up system error',error.message)

           }
    }

      

    return(
        <ScrollView>
         <View style={styles.container}>
         <StatusBar/>
            {
                successmsg == null ? 
                <View style={styles.container}>
                <Text style={styles.head1}>Sign Up</Text>
        
                {
                    customError !== '' && <Text style={styles.errormsg}>{customError}</Text>
                }
        
                    <View style={styles.inputout}>
                        <FontAwesome5 name="user" size={24} color={nameFocus === true  ? colors.text1 : colors.text2 } />
                        <TextInput style={styles.input} underlineColorAndroid="transparent" placeholder='Full Name' 
                        onFocus={() => {
                            setNameFocus(true);
                            setEmailFocus(false);
                            setPasswordFocus(false);
                            setShowPassword(false);
                            setConfirmPasswordFocus(false);
                            setShowConfirmPassword(false);
                            setPhoneFocus(false);
                            setCustomError('');
                        }} 
                          onChangeText={(text) => setName(text)}
                        />
                    </View>
        
                
                            {/* name ends */}
                      {/* email starts */}
        
                <View style={styles.inputout}>
                    {/* <FontAwesome5 name="user" size={24} color={emailFocus === true  ? colors.text1 : colors.text2 } /> */}
                    <MaterialCommunityIcons name="email-outline" size={24} color={emailFocus === true  ? colors.text1 : colors.text2 } />
                    <TextInput style={styles.input} underlineColorAndroid={"transparent"} placeholder='Email' 
                    onFocus={() => {
                        setEmailFocus(true);
                        setPasswordFocus(false);
                        setShowPassword(false);
                        setConfirmPasswordFocus(false);
                        setShowConfirmPassword(false);
                        setPhoneFocus(false);
                        setNameFocus(false);
                        setCustomError('');
                    }}
                    onChangeText={(text) => setEmail(text)}
                    />
                </View>
        
                    {/* email ends */}
                {/* phone number starts */}
        
                <View style={styles.inputout}>
                    <Feather name="smartphone" size={24} color={phoneFocus === true  ? colors.text1 : colors.text2 } />
                    <TextInput style={styles.input}  placeholder='Phone Number' 
                    onFocus={() => {
                        setPhoneFocus(true);
                        setEmailFocus(false);
                        setPasswordFocus(false);
                        setShowPassword(false);
                        setConfirmPasswordFocus(false);
                        setShowConfirmPassword(false);
                        setNameFocus(false);
                        setCustomError('');
                    }}
                    onChangeText={(text) => setPhone(text)}
                    />
                </View>
        
                {/* phone number ends */}
        
                {/* passowrd start */}
                <View style={styles.inputout}>
                    <Feather name="lock" size={24} color={passwordFocus === true ? colors.text1 : colors.text2} />
                    <TextInput style={styles.input} placeholder='Password' 
                    onFocus={ () => {
                        setEmailFocus(false);
                        setPasswordFocus(true);
                        setConfirmPasswordFocus(false);
                        setShowConfirmPassword(false);
                        setPhoneFocus(false);
                        setNameFocus(false);
                        setCustomError('');
                    }}
                    secureTextEntry={showPassword === false ? true : false}
                    onChangeText={(text) => setPassword(text)}
                    />
        
                    <Octicons name={showPassword == false ?"eye-closed" :"eye" } size={24} color="black"  
                    onPress={() => {setShowPassword(!showPassword)}}/>
                </View>
        
                {/* confirm password  starts*/}
        
                <View style={styles.inputout}>
                    <Feather name="lock" size={24} color={ConfirmPasswordFocus === true ? colors.text1 : colors.text2} />
                    <TextInput style={styles.input} placeholder='Confirm Password' 
                    onFocus={ () => {
                        setEmailFocus(false);
                        setPasswordFocus(false);
                        setConfirmPasswordFocus(true);
                        setShowPassword(false);
                        setPhoneFocus(false);
                        setNameFocus(false);
                        setCustomError('');
                    }}
                    secureTextEntry={showConfirmPassword === false ? true : false}
                    onChangeText={(text) => setConfirmPassword(text)}
                    />
        
                    <Octicons name={showConfirmPassword == false ?"eye-closed" :"eye" } size={24} color="black"  
                    onPress={() => {setShowConfirmPassword(!showConfirmPassword)}}/>
                </View>
        
                {/* password end */}
                {/* address starts */}
                    <Text style={styles.address}>Please enter your address</Text>        
                    <View style={styles.inputout}>
                        <TextInput style={styles.input} placeholder='enter your address' underlineColorAndroid="transparent" 
                        onChangeText={(text) => setAddress(text)}
                        onFocus={ () => {
                            setEmailFocus(false);
                            setPasswordFocus(false);
                            setConfirmPasswordFocus(false);
                            setShowPassword(false);
                            setPhoneFocus(false);
                            setNameFocus(false);
                            setCustomError('');
                        }}
                        />
                    </View>
        
                {/* address ends */}
        
        
                <TouchableOpacity style={btn1} onPress={() => handleSignup()}>
                    <Text style={{color:colors.col1, fontSize: titles.btntext, fontWeight:'bold'}}>Sign Up</Text>
                </TouchableOpacity>
        
                 {/* <Text style={styles.forgot}>Forgot Password</Text> */}
        
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
        
                <Text style={{marginBottom:60}}>Already have an account ?
                    <Text style={styles.signup} onPress={() => navigation.navigate('login')}>    Sign In</Text>
                </Text>
                </View> 
                :
                
                    <View style={styles.container1}>
                        <Text style={styles.successmessage}>{successmsg}</Text>
                        <TouchableOpacity style={btn1} onPress={() => navigation.navigate('login')}>
                        <Text style={{color:colors.col1, fontSize: titles.btntext, fontWeight:'bold'}}>Sign In</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={btn1} onPress={() => setSuccessmsg(null)}>
                        <Text style={{color:colors.col1, fontSize: titles.btntext, fontWeight:'bold'}}>Go Back</Text>
                    </TouchableOpacity>
                    </View>
            }
             

         </View>
        </ScrollView>
        
    )
}

const styles = StyleSheet.create ( {
    container: {
        flex:1,
         width: '100%',
        //  justifyContent:'center',
         alignItems:'center',
        //  marginTop: 60,
    },
    container1: {
        flex:1,
         width: '100%',
         justifyContent:'center',
         alignItems:'center',
         marginTop: 60,
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
        // underlineColorAndroid="transparent",
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
        marginBottom: 10,
        fontSize:25,
    },
    gf: {
        flexDirection:'row',

    },
    gficon: {
        backgroundColor:'gray',
        width: 50,
        marginHorizontal: 10,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        elevation: 20,
    },
    signup : {
        color: colors.text1,

    },
    address: {
        fontSize: 18,
        color: colors.text2,
        textAlign:'center',
        marginTop: 20,
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
    successmessage: {
        color: 'green',
        fontSize: 18,
        textAlign: 'center',
        margin: 10,
        borderColor: 'green',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    }
})

export default SignupScreen;