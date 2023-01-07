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

const fbLogin = () => {
  const navigation = useNavigation();

  const url = Linking.useURL();
  
  const openAuth = async () => {
    const state = "fb_23qwetaset"
    const oauth = await fetch('https://sean.devusol.net/keys').
      then((response) => {
        return response.json()
      }).then((final) => {
        return final;
      }).catch((error) => {
        console.error(error);
      });

    await WebBrowser.openBrowserAsync(
      `https://www.facebook.com/dialog/oauth?client_id=${oauth.facebookClientId}&redirect_uri=${oauth.facebookRedirect}&state=${state}` //{st=state123abc,ds=123456789}
    ).then((res) => {
      console.log("res", res);

      if (res.type !== "opened") {
        console.log("success");
      }
    });
  };

  React.useEffect(() => {
    async function getResponse() {
      const req = await url;

      if (req) {
        const newUrl = req.replace(/^https?\:\/\//i, "");

        // get name from string
        const name = newUrl.split("&")[0].split("=")[1].replace("%20", " ");
        const email = newUrl.split("&")[1].split("=")[1];
        const picture = newUrl.split("&")[2].split("=")[1];

        navigation.navigate("IamMeScreen", {
          name: name,
          email: email,
          picture: picture,
        });
      }
    }
    getResponse();
  });

  return (
    <TouchableOpacity onPress={openAuth}>
      <Image
        style={styles.tinyLogo}
        source={require("../assets/Facebook.png")}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tinyLogo: {
    width: 60,
    height: 60,
  },
});

export default fbLogin;
