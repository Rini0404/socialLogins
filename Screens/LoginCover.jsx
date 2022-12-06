import { useNavigation } from "@react-navigation/native";
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
} from "react-native";

import * as WebBrowser from 'expo-web-browser';
import { useAuthRequest, makeRedirectUri } from "expo-auth-session";
import React, { useState } from 'react';
import Constants from "expo-constants";
import FbLogin from "../components/fbLogin";

const discovery = {
  // for google
  authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenEndpoint: "https://www.googleapis.com/oauth2/v4/token",
};

const USE_PROXY = Platform.select({
  web: false,
  default: Constants.appOwnership === "standalone" ? false : true,
});
const REDIRECT_URI = makeRedirectUri({
  useProxy: USE_PROXY,
  native: "loginauth://redirect",
});

const CLIENT_ID = '421702174775-q1jbge72aku0h13g0lglh6gbari6s49f.apps.googleusercontent.com'

const CT_SECRET = "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";

WebBrowser.maybeCompleteAuthSession();


const LoginCover = () => {


  const [authRequest, response1, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID,
      usePKCE: false,
      scopes: ["openid", "profile", "email"],
      redirectUri: "https://dev.devusol.net/expoAuth/",
      extraParams: {
        // On Android it will just skip right past sign in otherwise
        show_dialog: "false",
      },
    },
    discovery
  );
  
  const [ profileObj, setProfileObj ] = useState({});

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



  const image = require("../assets/DEVUSOL.png");


  return (
    <View style={styles.container}>

      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.textOverall}>
          <Text style={styles.text}>DEVUSOL</Text>
          <Text style={styles.subtext}>please log in</Text>
          <View style={styles.row}>
            <TouchableOpacity
            onPress={() => {
              promptAsync({ useProxy: false })
            }}
            >
              <Image
                style={styles.tinyLogo}
                source={require("../assets/Google.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity>
             <FbLogin 

             />
            </TouchableOpacity>
          </View>
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

export default LoginCover