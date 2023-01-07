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
import GoogLogin from "../components/googLogin"
import * as Linking from "expo-linking";

const image = require("../assets/DEVUSOL.png");

const LoginCover = () => {
  const navigation = useNavigation();
  const [ready, setReady] = useState(false);
  const url = Linking.useURL();

  // React.useEffect(() => {

  //   async function getResponse() {
  //     const req = await url;

  //     if (req) {
  //       console.log("heard back req: ", req)
  //       const newUrl = req.replace(/^https?\:\/\//i, "");

  //       // get name from string
  //       const name = newUrl.split("&")[0].split("=")[1].replace("%20", " ");
  //       const email = newUrl.split("&")[1].split("=")[1];
  //       const picture = newUrl.split("&")[2].split("=")[1];
        
  //       navigation.navigate("IamMeScreen", {
  //         name: name,
  //         email: email,
  //         picture: picture,
  //       });
  //     }
  //   }
  //   getResponse();
  // })

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.textOverall}>
          <Text style={styles.text}>DEVUSOL</Text>
          <Text style={styles.subtext}>Welcome to v2.0.1!</Text>

          {/* line to sign up with */}

          <View style={styles.line}>
            <View style={styles.lineLeft}></View>
            <Text style={styles.lineText}>Sign up with</Text>
            <View style={styles.lineRight}></View>
          </View>
          <View style={styles.row}>
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
  lineLeft: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    width: 100,
  },
  lineRight: {
    borderBottomColor: "white",
    borderBottomWidth: 1,

    width: 100,
  },
  lineText: {
    color: "white",
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "bold",
    textAlign: "center",

    marginHorizontal: 10,
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

export default LoginCover;
