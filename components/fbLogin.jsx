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
      const state = "fb_x3m3j8990";
        const oauth = await fetch('https://mobileauth.devusol.cloud/keys').
      then((response) => {
        return response.json()
      }).then((final) => {
        return final;
      }).catch((error) => {
        console.error(error);
      });

    await WebBrowser.openBrowserAsync(
      `https://www.facebook.com/dialog/oauth?client_id=${oauth.facebookClientId}&redirect_uri=${oauth.facebookRedirect}&state=${state}&scope=openid%20email` //{st=state123abc,ds=123456789}
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
        const name = req.split("name=").pop().split("&")[0].replace("%20", " ");
        const email = req.split("email=").pop().split("&")[0];
        const picture = req.split("pic=")[1];

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
