import React,{useState, useEffect} from 'react';
import {View, Text, TextInput,StatusBar, StyleSheet, FlatList, ScrollView} from 'react-native';
import HomeHeadNav from '../components/HomeHeadNav';
import Categories from '../components/Categories';
import OfferSlider from '../components/OfferSlider';
import CardSlider from '../components/CardSlider';
import { AntDesign } from '@expo/vector-icons';
import {colors} from '../globals/style';

import firestore from '@react-native-firebase/firestore';
// import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
// import firebase from 'react-native-firebase';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import 'firebase/compat/firestore';
import  { firebase } from '../../Firebase/firebaseConfig';
import BottomNav from '../components/BottomNav';

const HomeScreen = ({navigation}) => {

    const [foodData, setFoodData] = useState([]);
    const [vegData ,setVegData] = useState([]);
    const [nonVegData, setNonVegData] = useState([]);
    const [search, setSearch] = useState('');

    const foodRef = firebase.firestore().collection('FoodData');

    useEffect(() => {
        foodRef.onSnapshot(snapshot => {
            setFoodData(snapshot.docs.map(doc => doc.data()))
      })
    },[])

    useEffect(() => {
        setVegData(foodData.filter((item) => item.foodType == 'veg'))
        setNonVegData(foodData.filter((item) => item.foodType == 'non-veg'))
    }, [foodData])
   
//    console.log('hello');
//    console.log(foodData);
//    console.log(vegData);

   
   

    return(
        <View style={styles.container}>
            <StatusBar/>
            <HomeHeadNav navigation={navigation}/>
            <View style={styles.bottomnav}>
              <BottomNav navigation={navigation}/>
            </View>
            
            <ScrollView style={styles.newmargin}>
            <View style={styles.searchbox}>
            <AntDesign name="search1" size={24} color="black" style={styles.searchicon}/>
            <TextInput style={styles.input} placeholder='search'
             onChangeText={(text) => setSearch(text)}
            />
        </View>

        {
            search != '' && <View style={styles.seacrhresultsouter}>
        <FlatList style={styles.searchresultsinner} data={foodData} renderItem={
            ({ item }) => {
                if (item.foodName.toLowerCase().includes(search.toLowerCase())) {
                    return (
                        <View style={styles.searchresult}>
                            <AntDesign name="arrowright" size={24} color="black" />
                            <Text style={styles.searchresulttext}>{item.foodName}</Text>
                        </View>
                    )
                }
            }
        } />
         </View>
        }
    

        <Categories/>
        <OfferSlider/>
        
       
        <CardSlider title={"All available Items"} data={foodData} navigation={navigation}/>
        <CardSlider title={"NonVeg Love"} data={nonVegData} navigation={navigation}/>
        <CardSlider title={"Veg Hunger"} data={vegData} navigation={navigation}/>
   
              
            </ScrollView>

        
        </View>
    )
};

 const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: colors.col1,
        // alignItems: 'center',
        width: '100%',
    },
    searchbox: {
        flexDirection: 'row',
        width: '90%',
        backgroundColor: colors.col1,
        borderRadius: 10,
        alignItems: 'center',
        padding: 10,
        margin: 20,
       elevation: 10,
    },
    input: {
        marginLeft:10,
        width: '90%',
        fontSize: 18,
        color: colors.text1,
    },
    searchicon: {
        color: colors.text1,
    },
    seacrhresultsouter: {
        width: '100%',
        marginHorizontal: 30,
        height: '100%',
        backgroundColor: colors.col1,
    },
    searchresultsinner: {
        width: '100%',
    },
    searchresult: {
        width: '100%',
        flexDirection: 'row',
        // alignItems: 'center',
        padding: 5,
    },
    searchresulttext: {
        marginLeft: 10,
        fontSize: 18,
        color: colors.text1,
    },
    bottomnav: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: colors.col1,
        zIndex: 20,
    },
    newmargin: {
        marginBottom: 50,
    }
    // bottomnav: {
    //     position: 'absolute',
    //     bottom: 0,
    //     width: '100%',
    //     backgroundColor: colors.col1,
    //     zIndex: 20,
    // }
 });

export default HomeScreen;