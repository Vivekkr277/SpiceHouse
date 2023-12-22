import React,{useState, useEffect} from 'react';
import {View, Text , StyleSheet, TouchableOpacity} from 'react-native';
import "firebase/compat/auth";
import 'firebase/compat/firestore';
import {firebase} from '../../Firebase/firebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import {navbtn, navbtnin, navbtnout, colors} from '../globals/style';

const UserProfile = ({navigation}) => {

    const [userloggeduid, setUserLoggeduid] = useState(null);
    const [userdata, setUserdata] = useState(null);

    


      
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

    useEffect(() => {
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
        getuserdata();
    },[userloggeduid])


    const handleLogout = () => {
        // firebase.auth().signOut()
        // .then(() => {
        //     setUserLogged(null);
        //     console.log('user loged out');
        // })
        // .catch((error) => {
        //     console.log(error);
        // })
     }

    return(
        <View style={styles.containerout}>
         <TouchableOpacity onPress={() => navigation.navigate('home')} style={navbtnout}>
           <View style={navbtn}>
           <Ionicons name="arrow-back-circle-outline" size={35} color="black" 
            style={navbtnin}
           />
             </View>
         
         </TouchableOpacity>

         <View style={styles.container}>
           <Text style={styles.head1}>Your Profile</Text>
            <View style={styles.conatinerin}>
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
           </View>

           <View style={styles.logoutview}>
             <TouchableOpacity onPress={() => handleLogout()}>
               <Text style={styles.btn}>Log Out</Text>
              </TouchableOpacity>
           </View>

           
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
    }
})