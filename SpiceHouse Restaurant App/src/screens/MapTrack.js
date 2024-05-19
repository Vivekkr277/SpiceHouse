import { View, Text } from 'react-native'
import React from 'react'
import MapView,{Marker} from 'react-native-maps';


export default function MapTrack() {
  return (
    <View style={{flex:1}}>
        <MapView
            style={{flex:1}}
            initialRegion={{
    
            latitude :28.351279171678005, 
            longitude: 76.13373344974103 ,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker 
           coordinate={{
            latitude:25.849688272790203,  
            longitude: 84.70670993755242,
           }}
           title="Your Location"
          />
       </MapView>
    </View>
  )
}