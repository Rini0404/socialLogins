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

    const launch = `https://www.facebook.com/dialog/oauth?client_id=${oauth.facebookClientId}&redirect_uri=${oauth.facebookRedirect}&state=${state}&scope=openid%20email`

    if (Platform.OS == "ios") {
      await WebBrowser.openAuthSessionAsync(launch).then((res) => {
        (res.type === "success") ? extract(res.url) : console.log("RESPONSE ERROR ", res);
      });

    } else {

      await WebBrowser.openBrowserAsync(launch).then((res) => {
        (res.type !== "opened") ? console.log("success") : console.log("RESPONSE ERROR ", res);
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
  }


  React.useEffect(() => {
    async function getAndroidResponse() {

      const req = url;
      console.log("use effect", req)
      if (req) extract(req);
    };
    getAndroidResponse();
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
