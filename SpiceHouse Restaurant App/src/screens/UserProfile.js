import React,{useState, useEffect} from 'react';
import {View, Text , StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import "firebase/compat/auth";
import 'firebase/compat/firestore';
import {firebase} from '../../Firebase/firebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import {navbtn, navbtnin, navbtnout, colors, btn2, btn1, btn3} from '../globals/style';
import WelcomeScreen from './LoginSignupScreens/WelcomeScreen';

const UserProfile = ({navigation}) => {

    const [userloggeduid, setUserLoggeduid] = useState(null);
    const [userdata, setUserdata] = useState(null);
    const [userlogged, setUserLogged] = useState(null);
    const [edit, setEdit] = useState(false);
    const [newname, setNewName] = useState('');
    const [newaddress, setNewAddress] = useState('');
    const [Passwordedit, setPasswordedit] = useState(false);
    const [oldpassword, setOldPassword] = useState('');
    const [newpassword, setNewPassword] = useState('');

    


      
    useEffect(() => {
       const checklogin = () => {
           firebase.auth().onAuthStateChanged((user) => {
               if(user) {
                   // console.log(user);
                   setUserLoggeduid(user.uid);
               }
               else{
                   setUserLoggeduid(null);
                //    navigation.navigate('login');
                //    console.log("No user logged in");
               }
           })
       }
       checklogin()
    },[])

    const getuserdata = async () => {
        const docRef = firebase.firestore().collection('UserData').where
        ('uid','==',userloggeduid);
        const doc = await docRef.get();
        if(!doc.empty) {
            doc.forEach((doc) => {
                setUserdata(doc.data());
            })
        }
        else {
            // navigation.navigate('login');
            console.log('No such document');
        }
    }

    useEffect(() => {
       
        getuserdata();
    },[userloggeduid]);




    

    

     const logoutuser = () => {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            alert('you are logged out');
            navigation.navigate('login');
        }).catch((error) => {
            // An error happened.
            alert('Server Issue');
        });
    }

     const updateuser = async () => {
        const docRef = firebase.firestore().collection('UserData').where('uid', '==', userloggeduid)
        const doc = await docRef.get();
        if (!doc.empty) {
            if (newname !== '') {
                doc.forEach((doc) => {
                    doc.ref.update({
                        name: newname
                    })
                })
            }
            if (newaddress !== '') {
                doc.forEach((doc) => {
                    doc.ref.update({
                        address: newaddress
                    })
                })
            }
            alert('your user data is updated');
            getuserdata();
            setEdit(false);
            setPasswordedit(false);
        }
        else {
            alert('no user data');
            console.log('no user data');
            setEdit(false);
            setPasswordedit(false);
        }
    }

    const updatepassword = async () => {
        const reauthenticate = (oldpassword) => {
            var user = firebase.auth().currentUser;
            var cred = firebase.auth.EmailAuthProvider.credential(
                user.email, oldpassword);
            return user.reauthenticateWithCredential(cred);
        }
        let docRef = firebase.firestore().collection('UserData').where('uid', '==', userloggeduid)
        let doc = await docRef.get();
        reauthenticate(oldpassword).then(() => {
            var user = firebase.auth().currentUser;
            user.updatePassword(newpassword).then(() => {
                // alert("Password updated!");

                if (!doc.empty) {
                    doc.forEach((doc) => {
                        doc.ref.update({
                            password: newpassword
                        })
                    })
                    alert('your password is updated');
                }
            }).catch((error) => { alert('Server Issue'); });
        }).catch((error) => { alert('Wrong Password'); });
        setPasswordedit(false);
    }

    return(
        <View style={styles.containerout}>
         <TouchableOpacity onPress={() => navigation.goBack()} style={navbtnout}>
           <View style={navbtn}>
           <Ionicons name="arrow-back-circle-outline" size={35} color="black" 
            style={navbtnin}
           />
             </View>
         </TouchableOpacity>

          {
            edit == false &&  Passwordedit == false &&  <View style={styles.container}>
            <Text style={styles.head1}>Your Profile</Text>
             <View style={styles.containerin}>
               <Text style={styles.head2}>Name : 
               {   
                 userdata ? 
                 <Text style={styles.head2in}>{userdata.name}</Text> 
                 :
                'loading' 
                }
                </Text>
                <Text style={styles.head2}>Email : 
                {   
                  userdata ? 
                  <Text style={styles.head2in}>{ userdata.email}</Text> 
                  :
                 'loading' 
                 }
                 </Text>
                 <Text style={styles.head2}>Phone : 
                 {   
                   userdata ? 
                   <Text style={styles.head2in}>{userdata.phone}</Text> 
                   :
                  'loading' 
                  }
                  </Text>
                  <Text style={styles.head2}>Address : 
                  {   
                    userdata ? 
                    <Text style={styles.head2in}>{userdata.address}</Text> 
                    :
                   'loading' 
                   }
                   </Text>
             </View>
             <TouchableOpacity onPress={() => {
                    setEdit(!edit)
                    setPasswordedit(false)
                }}>
                    <View style={btn3}>
                        <Text style={styles.btntxt}>Edit Details</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    setPasswordedit(!Passwordedit)
                    setEdit(false)
                    
                }
                }>
                    <View style={btn3}>
                        <Text style={styles.btntxt}>Edit Password</Text>
                    </View>
                </TouchableOpacity>
            </View>
          } 

          {
            edit == true &&   <View style={styles.container}>
            <Text style={styles.head1}>Edit Profile</Text>
            <View style={styles.containerin}>
                <TextInput style={styles.input} placeholder='Name' onChangeText={(e) => setNewName(e)} />
                <TextInput style={styles.input} placeholder='Address' onChangeText={(e) => setNewAddress(e)} />
            </View>
            <TouchableOpacity onPress={() => updateuser()}>
                <View style={btn3}>
                    <Text style={styles.btntxt}>Submit</Text>
                </View>
            </TouchableOpacity>
        </View>
          }

            {
                Passwordedit == true &&
                <View style={styles.container}>
                    <Text style={styles.head1}>Change your Password</Text>
                    <View style={styles.containerin}>
                        <TextInput style={styles.input} placeholder='Old Password' onChangeText={(e) => setOldPassword(e)} />
                        <TextInput style={styles.input} placeholder='New Password' onChangeText={(e) => setNewPassword(e)} />
                    </View>
                    <TouchableOpacity onPress={() => updatepassword()}>
                        <View style={btn3}>
                            <Text style={styles.btntxt}>Submit</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            }
      
              <TouchableOpacity onPress={() => logoutuser()}>
                <View style={styles.btnlogout}>
                    <Text style={styles.btntxt}>Logout</Text>
                </View>
            </TouchableOpacity>

           {/* <View style={styles.logoutview}>
             <TouchableOpacity onPress={() => handleLogout()}>
               <Text style={styles.btn}>Log Out</Text>
              </TouchableOpacity>
           </View> */}

           
        </View>
    )
}

export default UserProfile;

const styles = StyleSheet.create({
    containerout: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        width: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',
        width: '100%',
    },
    head1: {
        fontSize: 40,
        fontWeight: '200',
        marginVertical: 20,
        color: colors.text1,
    },
    head2: {
        fontSize: 20,
        fontWeight: '200',
        marginTop: 20,

    },
    containerin: {
        width: '90%',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 10,
        padding: 20,
        marginTop: 20,
    },
    head2: {
        fontSize: 20,
        fontWeight: '200',
        marginTop: 20,

    },
    head2in: {
        fontSize: 20,
        fontWeight: '300',
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
    logoutview: {
        marginBottom: 300,
    },
    input: {
        width: '100%',
        marginVertical: 10,
        backgroundColor: colors.col1,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        elevation: 20,
    },
    inputout: {
        flexDirection: 'row',
        width: '100%',
        marginVertical: 10,
        backgroundColor: colors.col1,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        // alignSelf: 'center',
        elevation: 20,
    },
    btntxt: {
        fontSize: 20,
        fontWeight: '400',
        color: 'white',
        textAlign: 'center',
        padding: 10
    },
    btnlogout : {
        // flex : ,
        width: 300,
        height: 50,
        // backgroundColor : 'red',
         backgroundColor : 'red',

        borderRadius: 10,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent : 'center',
        elevation : 10,
        // color : 'white',
         marginBottom : 30,
         marginLeft: 30,
        // margin : 10,
    }
})