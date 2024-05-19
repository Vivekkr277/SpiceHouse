import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
// import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import {colors} from '../globals/style';

const BottomNav = ({navigation, count}) => {
    return(
        <View style={styles.container}>

         <View style={styles.btncon1}>
            <AntDesign name="home" size={30} color="black" style={styles.icon1}
            onPress={() => {navigation.navigate('home')}}/>
         </View>

         <View style={styles.btncon2}>
            <AntDesign name="search1" size={35} color="black" style={styles.icon2}
            onPress={() => {navigation.navigate('home')}}/>
         </View>

        <View>
        <View style={styles.btncon1}>
            <AntDesign name="shoppingcart" size={30} color="black" style={styles.icon1} 
            onPress={() => {navigation.navigate('cart')}}/>
       
         </View>
       
        </View>
        

         <View style={styles.btncon1}>
           <FontAwesome5 name="map-marked-alt" size={30} color="black" style={styles.icon1}
            onPress={() => {navigation.navigate('track')}}/>
         </View>

        
         {/* <View style={styles.badge}>
         <Text>{count}</Text>
         </View > */}

        </View>
    )
}

export default BottomNav;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '100%',
        elevation: 30,
        borderTopColor: colors.text1,
        borderTopWidth: 0.5,
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
    },
    btncon1: {
        alignItems: 'center',
        backgroundColor: colors.col1,
        elevation: 10,
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',

    },
    btncon2: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        top: -13,
        backgroundColor: colors.text1,
        width: 60,
        height: 60,
        borderRadius: 60,
    },
    icon2: {
        color: 'white',

    },
    icon1: {
        color: colors.text1,

    },
    badge : {
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor : 'red',
        height: 20,
        width : 20,
        borderRadius: 10

    }
})