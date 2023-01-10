import {
  View,
  Image,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import * as Linking from "expo-linking";

const googleLogin = () => {
  const navigation = useNavigation();
  const url = Linking.useURL();

  const openAuth = async () => {
    const state = "goog_23qwetaset";
    const oauth = await fetch("https://mobileauth.devusol.cloud/keys")
      .then((response) => {
        return response.json();
      })
      .then((final) => {
        return final;
      })
      .catch((error) => {
        console.error(error);
      });

    const launch = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${oauth.googleClientId}&redirect_uri=${oauth.googleRedirect}&scope=https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile&access_type=offline&prompt=consent&state=${state}`;

    if (Platform.OS == "ios") {
      await WebBrowser.openAuthSessionAsync(launch).then((res) => {
        res.type === "success"
          ? extract(res.url)
          : console.log("RESPONSE ERROR ", res);
      });
    } else {
      await WebBrowser.openBrowserAsync(launch).then((res) => {
        res.type !== "opened"
          ? console.log("success")
          : console.log("RESPONSE ERROR ", res);
      });
    }
  };

  const extract = (req) => {
    const name = req.split("name=").pop().split("&")[0].replace("%20", " ");
    const email = req.split("email=").pop().split("&")[0];
    const picture = req.split("pic=")[1];

    navigation.navigate("IamMeScreen", {
      name: name,
      email: email,
      picture: picture,
    });
  };

  React.useEffect(() => {
    async function getAndroidResponse() {
      if (Platform.OS == "ios") return;
      const req = url;
      console.log("use effect", req);

      if (req) extract(req);
    }
    getAndroidResponse();
  });

  return (
    <TouchableOpacity style={styles.button} onPress={openAuth}>
   
        <Text style={styles.text}> Google</Text>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tinyLogo: {
    width: 40,
    height: 40,
    backgroundColor: "white",
    borderRadius: 5,
    margin: 5,
  },
  button: {
    backgroundColor: "#4C8BF5",
    padding: 10,
    marginBottom: 0,
    margin: 20,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  text: {
    color: "white",
    fontSize: 20,
 
    textAlign: "center",
  },
});

export default googleLogin;
