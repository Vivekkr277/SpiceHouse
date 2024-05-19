import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const About = ({navigation}) => {
    return(
        <View style={{marginTop:20}}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back-circle-outline" size={35} color="black"/>
            </TouchableOpacity>
                <View style={{margin:20, borderRadius: 20 ,padding: 10}}>
            <Text style={{fontSize:20, letterSpacing:1,}}>This is a restaurant app, name  Pahadi Baba. This app was developed as minor project in our 
                semester. This project is developed by three members (Vivek, Bharat, Rohit) , they are in one group
                and decided to develope this restaurant app.
                 It was our first project and we have given our 100% and developed it.
            </Text>
                </View>
        </View>
    )
}

export default About;