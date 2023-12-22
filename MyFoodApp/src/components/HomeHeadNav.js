import React from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
// import { Colors }  from 'react-native/Libraries/NewAppScreen';
import {colors} from '../globals/style';

const HomeHeadNav = ({navigation}) => {
    return(
        <View style={styles.container}>
        <Fontisto name="nav-icon-list-a" size={24} color="black" style={styles.myicon}/>
         <View style={styles.containerin}>
         <Text style={styles.mytext}>Pahadi Baba </Text>
         <Ionicons name="fast-food-outline" size={24} color="black" style={styles.myicon}/>
         </View>
         <TouchableOpacity onPress={() => navigation.navigate('userprofile')}>
            <FontAwesome5 name="user-circle" size={24} color="black"  style={styles.myicon}/>
         </TouchableOpacity>
         
        
         
        </View>
    )
};

const styles = StyleSheet.create({
   container: {
    // flex:1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
    backgroundColor: colors.col1,
    elevation: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
   },
   containerin: {
    flexDirection : 'row',
    alignItems: 'center',
   },
   myicon: {
    color: colors.text1,
   },
   mytext: {
    color: colors.text1,
    fontSize: 24,
   }
});

export default HomeHeadNav;