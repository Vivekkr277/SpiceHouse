import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {hr80} from "../../globals/style"

const Contact = ({navigation}) => {
    return(
        <View style={styles.container} >
             <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back-circle-outline" size={35} color="black"/>
            </TouchableOpacity>
            <View style={styles.out}>
                <Text style={styles.text}>Phone : +91 7061411553</Text>
                <Text style={styles.text}>Email : vkr70611@gmail.com</Text>
                <View style={hr80}/>
                <Text style={styles.text}>Phone : +91 9926480050</Text>
                <Text style={styles.text}>Email : rohitpatidar583@gmail.com</Text>
                <View style={hr80}/>
                <Text style={styles.text}>Phone : +91 7900887630</Text>
                <Text style={styles.text}>Email : 1bhrtsnegi@gmail.com</Text>
                <View style={hr80}/>
            </View>
        </View>
    )
}

export default Contact;

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    out: {
        flex:1,
        marginTop: 100,
        marginLeft : 30
    },
    text : {
        fontSize: 18
    }
})