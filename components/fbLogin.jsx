import { View, Image,  Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useAuthRequest, makeRedirectUri } from "expo-auth-session";
import React, { useState } from "react";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";

const discovery = {
  // for facebook
  authorizationEndpoint: "https://www.facebook.com/v11.0/dialog/oauth",
  tokenEndpoint: "https://graph.facebook.com/v11.0/oauth/access_token",
};

const USE_PROXY = Platform.select({
  web: false,
  default: Constants.appOwnership === "standalone" ? false : true,
});
const REDIRECT_URI = makeRedirectUri({
  useProxy: USE_PROXY,
  native: "loginauth://redirect",
});

const APP_ID = "3184359635207513";

const state = "{st=state123abc,ds=123456789}"

const APP_SECRET = "8d90674d78bf4f9472bd934f4a2ccdb4";

const fbLogin = () => {
  // login with facebook
  const [authRequest, response1, promptAsync] = 
  useAuthRequest(
    {
      clientId: APP_ID,
      usePKCE: false,
      scopes: ["public_profile", "email"],
      redirectUri: "https://dev.devusol.net/expoAuth/fb",
      extraParams: {
        // On Android it will just skip right past sign in otherwise
        show_dialog: "false",
      },
    },
    discovery
  );

  const navigation = useNavigation()

  React.useEffect(() => {
    if (response1) {
     // console.log('authResponse', response1)
     const { url } = response1;

     const newUrl = url.replace(/^https?\:\/\//i, "")
     
     // get name from string
     const name = newUrl.split('&')[0].split('=')[1].replace('%20', ' ')

     // get email from string
     const email = newUrl.split('&')[1].split('=')[1]


     // get picture from string
     const picture = newUrl.split('&')[2].split('=')[1]

     navigation.navigate('IamMeScreen', {name, email, picture})
    }
  }, [response1]);

  return (
      <TouchableOpacity onPress={() => promptAsync()}>
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
