import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './src/screens/LoginSignupScreens/WelcomeScreen'
import LoginScreen from './src/screens/LoginSignupScreens/LoginScreen';
import SignupScreen from './src/screens/LoginSignupScreens/SignupScreen';
import HomeScreen  from './src/screens/HomeScreen';
import Productpage from './src/screens/Productpage';
import UserCart from './src/screens/UserCart';
import Placeorder from './src/screens/Placeorder';
// import RootNavigation from './src/RootNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserProfile from './src/screens/UserProfile';
import InfoPage from './src/components/InfoPage';
import Contact from './src/components/Info/Contact';
import About from './src/components/Info/About';
import TrackOrder from './src/screens/TrackOrder';
import MapTrack from './src/screens/MapTrack';
import BreakfastPage from './src/components/categroy/BreakfastPage';
import DinnerPage from './src/components/categroy/DinnerPage';
import DrinkPage from './src/components/categroy/DrinkPage';
import StartersPage from './src/components/categroy/StartersPage';

export default function App() {

  const Stack = createNativeStackNavigator();
  return (

    <NavigationContainer>

      <Stack.Navigator >
        <Stack.Screen name="welcomepage" component={WelcomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="signup" component={SignupScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="login" component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="home" component={HomeScreen}
          options={{
            headerShown: false,
          }} />
          <Stack.Screen name="userprofile" component={UserProfile}
          options={{
            headerShown: false,
          }} />
          <Stack.Screen name="productpage" component={Productpage}
          options={{
            headerShown: false,
          }} />
          <Stack.Screen name="cart" component={UserCart}
          options={{
            headerShown: false,
          }} />
          <Stack.Screen name="placeorder" component={Placeorder}
          options={{
            headerShown: false,
          }} />
          <Stack.Screen name="infopage" component={InfoPage}
          options={{
            headerShown: false,
          }}/>
          <Stack.Screen name="contact" component={Contact} 
          options={{
            headerShown: false,
          }}/>
          <Stack.Screen name="about" component={About} 
          options={{
            headerShown: false,
          }} />
           <Stack.Screen name="track" component={TrackOrder} 
          options={{
            headerShown: false,
          }} />
           <Stack.Screen name="maptrack" component={MapTrack} 
          options={{
            headerShown: false,
          }} />
          <Stack.Screen name="dinner" component={DinnerPage}
          options={{
            headerShown : false,
          }}/>
          <Stack.Screen name="breakfast" component={BreakfastPage}
          options={{
            headerShown : false,
          }} />
          <Stack.Screen name="starter" component={StartersPage}
          options={{
            headerShown : false,
          }}/>
          <Stack.Screen name="drink" component={DrinkPage} 
          options={{
            headerShown : false,
          }}/>
      </Stack.Navigator>

    </NavigationContainer>



  )
}


