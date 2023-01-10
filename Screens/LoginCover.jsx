import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
  Image,
  Platform,
  AppState,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
import Constants from "expo-constants";
import FbLogin from "../components/fbLogin";
import GoogLogin from "../components/googLogin";
import * as Linking from "expo-linking";
import DevusolMain from "../assets/DevusolMain.png";

const image = require("../assets/DEVUSOL.png");

const LoginCover = () => {
  const navigation = useNavigation();
  const [ready, setReady] = useState(false);
  const url = Linking.useURL();

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.logo}>
          <Image style={styles.imagelogo} source={DevusolMain} />
        </View>
        <View style={styles.textOverall}>
          <Text style={styles.textName}>Orlando App Studio</Text>
          <Text style={styles.subtext}>
            Orlando App Studio will help you develop your business on the web
            and in mobile applications from design to deployment in Windows,
            iOS, Android and beyond.
          </Text>
          {/* line to sign up with */}
          <View style={styles.line}>
            <View style={styles.linecenter}></View>
          </View>
          <Text style={styles.lineText}>Login / Sign Up</Text>
          <View>
            <TouchableOpacity>
              <GoogLogin />
            </TouchableOpacity>
            <TouchableOpacity>
              <FbLogin />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  line: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    
  },
  linecenter: {
    borderBottomColor: "#656565",
    borderBottomWidth: 2,
    width: 300,
  },
  
  lineText: {
    color: "#C4C4C4",
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 10,
    paddingTop: 30,
  },

  text: {
    color: "white",
    fontSize: 50,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",

  },
  textName: {
    color: "#C0FF6B",
    fontSize: 28,
    lineHeight: 50,
    textAlign: "left",
    paddingHorizontal: 50,
  },
  textOverall: {
    paddingTop: 20,
  },
  subtext: {
    color: "white",
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "bold",
    textAlign: "left",
    paddingHorizontal: 50,
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

  logo: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  imagelogo: {
    resizeMode: "contain",
    width: 300,
    height: 80,
    alignItems: "center",
  },
});

export default LoginCover;
