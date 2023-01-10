import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator} from "@react-navigation/native-stack";
import IamMeScreen from './IamMeScreen';
import LoginCover from './LoginCover';
import * as Linking from 'expo-linking';
import { useFonts } from 'expo-font';

const prefix = Linking.createURL('/');

const Stack = createNativeStackNavigator();



const Pages = () => {

  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        IamMeScreen: 'IamMeScreen',
        LoginCover: 'LoginCover',
      },
    },
  };

  const [fontsLoaded] = useFonts({
    'DFont': require('../assets/DFont.ttf'),
    'KFont': require('../assets/KFont.ttf'),
  });

  return (
    <NavigationContainer linking={linking} >
    <Stack.Navigator
      initialRouteName="LoginCover"
    >
      <Stack.Screen name="IamMeScreen"
        options={{ headerShown: false }}
      component={IamMeScreen} />
      <Stack.Screen name="LoginCover" 
        options={{ headerShown: false }}
      component={LoginCover} />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default Pages