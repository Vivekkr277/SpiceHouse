import React from 'react';
import {View, Text, TextInput, Image, StyleSheet} from 'react-native';
import {colors} from '../globals/style';
import Swiper from 'react-native-swiper';

const carouselData = [
    {
        id: 1,
        image : '../../assets/sliderImage/image1.jpg',
    },
    {
        id: 2,
        image : '../../assets/sliderImage/image2.png',
    },
    {
        id:3,
        image : '../../assets/sliderImage/image3.jpg',
    },
    {
        id: 4,
        image : '../../assets/sliderImage/image5.jpg',
    },
    {
        id: 5,
        image : '../../assets/sliderImage/image5.jpg',
    }
]

const OfferSlider = () => {
    return(
        <View>
           <View style={styles.offerSlider}>
              <Swiper autoplay={true} autoplayTimeout={4}
                    showsButtons={true} dotColor={colors.text2}
                    activeDotColor={colors.text1}>
                   
                 <View style={styles.slide}>
                    <Image source={require('../../assets/sliderImage/image1.jpg')} style={styles.image}/>
                 </View>
                 <View style={styles.slide}>
                    <Image source={require('../../assets/sliderImage/image2.png')} style={styles.image}/>
                 </View>
                 <View style={styles.slide}>
                    <Image source={require('../../assets/sliderImage/image3.jpg')} style={styles.image}/>
                 </View>
                 
                 <View style={styles.slide}>
                    <Image source={require('../../assets/sliderImage/image5.jpg')} style={styles.image}/>
                 </View>
              </Swiper>
           </View>
         </View>
    )
}; 

const styles = StyleSheet.create( {
    offerSlider: {
        width: '100%',
        height: 200,
        backgroundColor: colors.col1,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    slide: {
        width: '100%',
        height: 200,
        backgroundColor: colors.text3,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius:20,
    },
    image : {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
    // buttonText: {
    //     color: colors.text1,
    //     fontSize:50,
    // }
});

export default OfferSlider;