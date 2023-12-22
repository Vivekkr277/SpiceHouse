import React from 'react';
import {View, Text, TextInput, StyleSheet, ScrollView} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import {colors} from '../globals/style';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const Categories = () => {

    return(
        <View style={styles.container}>
         <Text style={styles.head}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.box}>
              <FontAwesome5 name="hamburger" size={24} color="black" style={styles.myicon}/>
                  <Text style={styles.text}>Burger</Text>
              </View>
              <View style={styles.box}>
              <FontAwesome5 name="pizza-slice" size={24} color="black" style={styles.myicon}/>
                  <Text style={styles.text}>Pizza</Text>
              </View>
              <View style={styles.box}>
              <MaterialCommunityIcons name="noodles" size={24} color="black" style={styles.myicon}/>
               
                  <Text style={styles.text}>Noodles</Text>
              </View>
              <View style={styles.box}>
              <Entypo name="drink" size={24} color="black" style={styles.myicon}/>
              
                  <Text style={styles.text}>Drink</Text>
              </View>
              <View style={styles.box}>
              <FontAwesome name="birthday-cake" size={24} color="black" style={styles.myicon}/>
               
                  <Text style={styles.text}>Birthday Cake</Text>
              </View>
          </ScrollView>
        </View>
    )
};

 const styles = StyleSheet.create({
     container: {
        backgroundColor: colors.col1,
        width: '100%',
        elevation: 10,
        borderRadius: 10,
     },
     head: {
        color: colors.text1,
        fontSize: 25,
        fontWeight: '300',
        margin: 10,
        alignSelf: 'center',
        paddingBottom: 5,
       borderBottomColor: colors.text1,
       borderBottomWidth: 1,
     },
     box: {
        backgroundColor:colors.col1,
        elevation: 20,
        margin: 10,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
     },
     myicon: {
        marginRight: 10,
        // color : colors.text3,
     }
 });

export default Categories;