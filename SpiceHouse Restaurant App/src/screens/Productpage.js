import React,{useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView , TouchableOpacity, Image, TextInput} from 'react-native';
import {navbtn, navbtnin, navbtnout, colors, veg, nonveg, btn2, hr80, incdecout,incdecbtn, incdecinput} from '../globals/style';
import { Ionicons } from '@expo/vector-icons';
import  {firebase} from '../../Firebase/firebaseConfig';
import "firebase/compat/auth";
import 'firebase/compat/firestore';
import BottomNav from '../components/BottomNav';

const Productpage = ({navigation, route}) => {
    const data = route.params;

    if(route.params === undefined) {
        navigation.navigate('home');
    }

    const [quantity, setQuantity] = useState('1');
    const [addonquantity, setAddonquantity] = useState('0');
    const [count, setCount] = useState('0');

    const addTocart = () => {
        const docRef = firebase.firestore().collection('UserCart').doc(firebase.auth().currentUser.uid);
        const data1 = {data, Addonquantity : addonquantity, Foodquantity : quantity}

        docRef.get().then((doc) => {
            if(doc.exists) {
                docRef.update({
                    cart: firebase.firestore.FieldValue.arrayUnion(data1)
                })
                setCount(count + 1)

                
            }
            else {
                docRef.set({
                    cart : [data1]
                })
                setCount(count + 1)

               
            }
            alert('Item added to Cart')
        })

    }

    const increaseQuantity = () => {
        setQuantity((parseInt(quantity) + 1).toString());
    }

    const decreaseQuantity= () => {
        if(parseInt(quantity) > 1 ) {
            setQuantity((parseInt(quantity) - 1).toString());
        }
    }

    const increaseAddonQuantity = () => {
        setAddonquantity((parseInt(addonquantity) + 1).toString());
    }

    const decreaseAddonQuantity= () => {
        if(parseInt(addonquantity) > 0 ) {
            setAddonquantity((parseInt(addonquantity) - 1).toString());
        }
    }

    const cartdata = JSON.stringify({ cart: [{ Addonquantity: addonquantity, Foodquantity: quantity, data }] });

    return(
        <View style={styles.containerview}>
        <ScrollView style={styles.container}>
                <TouchableOpacity onPress={() => navigation.navigate('home')} style={navbtnout}>
                <View style={navbtn}>
                <Ionicons name="arrow-back-circle-outline" size={35} color="black" 
                style={navbtnin}
                />
                </View>
            
                 </TouchableOpacity>
                 <View style={styles.container1}>
                    <View style={styles.s1}>
                       <Image source={{ 
                        uri: data.foodImageUrl
                       }} style={styles.cardimgin}/>
                     </View>
                     <View style={styles.s2}>
                    <View style={styles.s2in}>
                       <Text style={styles.head1}>{data.foodName}</Text>
                       <Text style={styles.head2}>Rs. {data.foodPrice}/-</Text>
                     </View>

                        <View style={styles.s3}>
                        <Text style={styles.head3}>About Food</Text>
                        <Text style={styles.head4}>{data.foodDescription}</Text>
                        <View style={styles.s3in}>
                            { data.foodType == 'veg' ? 
                            <Text style={veg}></Text> :
                            <Text style={nonveg}></Text> }
                            <Text style={styles.head5}>{data.foodType}</Text>
                        </View>
                        </View>

                       

                          <View style={styles.container3}>
                             <View style={hr80}></View>
                             <Text style={styles.txt5}>Food Quantity</Text>
                                <View style={incdecout}>
                                     <Text style={incdecbtn} onPress={() => increaseQuantity()} >+</Text> 
                                     <TextInput value={quantity} style={incdecinput}/>
                                     <Text style={incdecbtn} onPress={() => decreaseQuantity()} >-</Text>
                                </View>
                                <View style={hr80}></View>
                             </View>
     

                                {data.foodAddonPrice != '' && 
                                  <View style={styles.container3}>
                                   
                                       <Text style={styles.txt5}>Add Extra</Text>
                                        <View style={styles.c3in}>
                                           <Text style={styles.txt4}>{data.foodAddon}</Text>
                                           <Text style={styles.txt4}>Rs.{data.foodAddonPrice}/-</Text>
                                        </View>
                                        <View style={incdecout}>
                                        <Text style={incdecbtn} onPress={() => increaseAddonQuantity()} >+</Text> 
                                        <TextInput value={addonquantity} style={incdecinput}/>
                                        <Text style={incdecbtn} onPress={() => decreaseAddonQuantity()} >-</Text>
                                        </View>
                                        <View style={hr80}></View>
                                  </View>
                            }

                                

                            </View>
                     
                              <View style={styles.container4}>
                                  <View style={styles.c4in}>
                                     <Text style={styles.txt2}>Total Price</Text>
                                     {
                                        data.foodAddonPrice != ''  ? 
                                        <Text style={styles.txt6}>
                                        Rs.{((parseInt(data.foodPrice) * parseInt(quantity)) + 
                                            (parseInt(addonquantity) * parseInt(data.foodAddonPrice))).toString()}/-
                                        </Text> 
                                        :
                                         <Text style={styles.txt6}>
                                          Rs.{(parseInt(data.foodPrice) * parseInt(quantity)).toString()}/-
                                         </Text>
                                     }
                                  </View>
                              
                              </View>
                        <View style={styles.btncont}>
                            <TouchableOpacity style={btn2} onPress={() => { addTocart() }}>
                                <Text style={styles.btntxt}>Add to Cart</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={btn2} onPress={() => navigation.navigate('placeorder', { cartdata })}>
                                <Text style={styles.btntxt} >Buy Now</Text>
                            </TouchableOpacity>
                        </View>
                 </View>
                 
           
        </ScrollView>
        <View style={styles.bottomnav}>
         <BottomNav navigation={navigation}/>
        </View>
        </View>
    )
}

export default Productpage;

const styles = StyleSheet.create({
    containerview: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        width: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        width: '100%',
        marginBottom: 65,
    },
    container1: {
        // position: 'absolute',
        // top: 0,
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    s1: {
        width: '100%',
        height: 300,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    cardimgin: {
        width: '100%',
        height: '100%',
    },
    s2: {
        width: '100%',
        padding: 20,
        position: 'relative',
        top: -30,
        backgroundColor: colors.col1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    s2in: {
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: 'center',
        marginBottom: 10,
    },
    head1: {
        fontSize: 28,
        fontWeight: '500',
        color: colors.text1,
        width: 220,
        marginRight: 10,
    },
    head2: {
        fontSize: 35,
        fontWeight: '200',
        color: colors.text3,
        // marginRight:5,
    },
    s3: {
        backgroundColor: colors.text1,
        padding: 20,
        borderRadius: 20,
    },
    head3: {
        fontSize: 30,
        fontWeight: '200',
        color: colors.col1,
    },
    head4: {
        marginVertical: 10,
        fontSize: 20,
        fontWeight: '400',
        color: colors.col1,
    },
    s3in: {
        backgroundColor: colors.col1,
        padding: 10,
        borderRadius: 10,
        width: 130,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    head5: {
        color: colors.text3,
        fontSize: 20,
        fontWeight: '200',
        marginLeft: 10,
    },
    btntxt: {
        backgroundColor: colors.text1,
        color: colors.col1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 20,
        borderRadius: 10,
        width: '90%',
        textAlign: 'center',

    },
    btncont: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
        flexDirection: 'row',
    },
    container2: {
        width: '90%',
        backgroundColor: colors.col1,
        padding: 20,
        borderRadius: 20,
        alignSelf: 'center',
        marginVertical: 10,
        elevation: 10,
        alignItems: 'center',
    },
    txt1: {
        color: colors.text1,
        fontSize: 20,
        fontWeight: '200',

    },
    txt2: {
        color: colors.text3,
        fontSize: 30,
        fontWeight: '200',
        marginVertical: 10,

    },
    container2in: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    txt3: {
        color: colors.text1,
        fontSize: 18,
        width: '30%',
        textAlign: 'center',
    },
    txt5: {
        color: colors.text1,
        fontSize: 18,
        // width: '30%',
        textAlign: 'center',
    },
    txt6: {
        color: '#64748b',
        fontSize: 35,
        // width: '30%',
        textAlign: 'center',
    },
    dash: {
        width: 1,
        height: 20,
        backgroundColor: colors.text1,
        marginHorizontal: 10,
    },
    container3: {
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
    },
    c3in: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    },
    txt4: {
        color: colors.text3,
        fontSize: 20,
        marginHorizontal: 10,
    },
    c4in: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    container4: {
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
    },
    bottomnav: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: colors.col1,
        zIndex: 20,
    },

})