import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator} from "@react-navigation/native-stack";
import IamMeScreen from "./IamMeScreen";

const Stack = createNativeStackNavigator();

export default function App({ navigation }) {
  const image = require("./assets/DEVUSOL.png");

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="IamMeScreen" component={IamMeScreen} />
        </Stack.Navigator>
      </NavigationContainer>

      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.textOverall}>
          <Text style={styles.text}>DEVUSOL</Text>
          <Text style={styles.subtext}>please log in</Text>
          <View style={styles.row}>
            <TouchableOpacity>
              <Image
                style={styles.tinyLogo}
                source={require("./assets/Google.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={styles.tinyLogo}
                source={require("./assets/Facebook.png")}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("IamMeScreen")}
          >
            <Text>BYPASS</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  text: {
    color: "white",
    fontSize: 80,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
  },
  textOverall: {
    top: "50%",
  },
  subtext: {
    color: "white",
    fontSize: 24,
    lineHeight: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    paddingTop: 50,
  },
  button: {
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    margin: 70,
  },
  tinyLogo: {
    width: 60,
    height: 60,
  },
});
