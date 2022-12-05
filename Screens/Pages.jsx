import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator} from "@react-navigation/native-stack";
import IamMeScreen from './IamMeScreen';
import LoginCover from './LoginCover';

const Stack = createNativeStackNavigator();


const Pages = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator
      initialRouteName="LoginCover"
    >
      <Stack.Screen name="IamMeScreen" component={IamMeScreen} />
      <Stack.Screen name="LoginCover" component={LoginCover} />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default Pages