import React from 'react';
import {View, Text, Button, TouchableOpacity, StyleSheet} from 'react-native';
import { colors } from '../globals/style';
import { Ionicons } from '@expo/vector-icons';

const InfoPage = ({navigation}) => {
    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back-circle-outline" size={35} color="black"/>
            </TouchableOpacity>
           
            <View style={styles.m1View}>
                <TouchableOpacity onPress={() => navigation.navigate('about')}>
                    <Text style={styles.btn}>About Us</Text>
                </TouchableOpacity>
                </View>
                <View style={styles.m2View}>
                <TouchableOpacity onPress={() => navigation.navigate('contact')}>
                    <Text style={styles.btn}>Contact </Text>
                </TouchableOpacity>
               </View>
               
            
        </View>
    )
}

export default InfoPage;

const styles = StyleSheet.create({
    container :  {
        flex:1,
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    btn: {
        fontSize:20,
        color: 'white',
        textAlign: 'center',
        // backgroundColor: 'orange',
        backgroundColor: '#64748b',
        margintVertical : 30,
        marginHorizontal: 10,
         fontWeight: '700',
        borderRadius: 10,
        padding: 10,
        paddingHorizontal: 20,

    },
    m1View: {
        marginTop:100,
        marginBottom:10,
        width:'80%',
        marginLeft :53
    },
    m2View : {
        width: 250,
        marginLeft: 53,
        marginTop: 20,
        width:'80%',
    }
})