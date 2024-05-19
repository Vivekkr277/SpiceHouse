import { View, Text, StyleSheet, StatusBar } from 'react-native'
import React,{useState, useEffect} from 'react'
import BottomNav from '../BottomNav';
import HomeHeadNav from '../HomeHeadNav';
import {colors, col1, titles} from '../../globals/style';
import 'firebase/compat/firestore';
import {firebase} from '../../../Firebase/firebaseConfig';
import CategoryCardSlider from './CategoryCardSlider';

export default function DrinkPage({navigation}) {

 
    const [foodData, setFoodData] = useState([]);
    const [dinnerData ,setDinnerData] = useState([]);

    const foodRef = firebase.firestore().collection('FoodData');

useEffect(() => {
    foodRef.onSnapshot(snapshot => {
        setFoodData(snapshot.docs.map(doc => doc.data()))
  })
},[]);

useEffect(() => {
    setDinnerData(foodData.filter((item) => item.mealType == 'liquid'))

},[foodData]);

  return (
    <View style={styles.container}>
    <HomeHeadNav navigation={navigation} />
    <View style={styles.bottomnav}>
        <BottomNav navigation={navigation}/>
    </View>
    
     <CategoryCardSlider title={"Breakfast Items"} data={dinnerData} navigation={navigation} scroll={true}/>
</View>
  )
}


const styles = StyleSheet.create({
    container : {
        flex:1,
        backgroundColor: colors.col1,
         width: '100%',
     },
    bottomnav : {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: colors.col1,
        zIndex: 20,
    },
    headtext : {
        fontSize: 35,
        fontWeight : '500',
        color : colors.text3,
    },
    headview : {
        justifyContent : 'center',
        alignItems : 'center',
    }
})