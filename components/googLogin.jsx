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

  const openAUth = async () => {
    const state = "goog_23qwetaset"
    const oauth = await fetch('https://mobileauth.devusol.cloud/keys').
      then((response) => {
        return response.json()
      }).then((final) => {
        return final;
      }).catch((error) => {
        console.error(error);
      });

    const launch = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${oauth.googleClientId}&redirect_uri=${oauth.googleRedirect}&scope=https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile&access_type=offline&prompt=consent&state=${state}`

    
    if (Platform.OS == "ios") {

      _iosOpenWebBrowser(launch);

    } else {

      await WebBrowser.openBrowserAsync(
        `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${oauth.googleClientId}&redirect_uri=${oauth.googleRedirect}&scope=https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile&access_type=offline&prompt=consent&state=${state}`
      ).then((res) => {
        console.log("res", res);
        // setReady(true)
        if (res.type !== "opened") {
          console.log("success");
        }
      });
    }
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
    <TouchableOpacity onPress={openAUth}>
      <Image
        style={styles.tinyLogo}
        source={require("../assets/Google.png")}
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

export default googleLogin;
