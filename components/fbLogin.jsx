import { View, Text, Button } from 'react-native'
import React from 'react'

import * as WebBrowser from 'expo-web-browser';
import { useAuthRequest, makeRedirectUri } from "expo-auth-session";
import React, { useState } from 'react';
import Constants from "expo-constants";

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

const APP_ID = '3184359635207513'

const APP_SECRET = "8d90674d78bf4f9472bd934f4a2ccdb4";

const fbLogin = () => {

  const [authRequest, authResponse, promptAsync] = useAuthRequest(
    {
      clientId: APP_ID,
      usePKCE: false,
      scopes: ["openid", "profile", "email"],
      redirectUri: REDIRECT_URI,
      extraParams: {
        // On Android it will just skip right past sign in otherwise
        show_dialog: "false",
      },
    },
    discovery
  );

  //  get their id_token
  const [idToken, setIdToken] = useState(null);

  React.useEffect(() => {
    if (authResponse?.type === "success") {
      const { code } = authResponse.params;
      // exchange the code for an access token
      fetch(discovery.tokenEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },

        body: `client_id=${APP_ID}&redirect_uri=${REDIRECT_URI}&client_secret=${APP_SECRET}&code=${code}`,
      })
        .then((response) => response.json())
        .then((response) => {
          console.log("response", response);
          setIdToken(response.access_token);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }, [authResponse]);

  








  return (
    <View>
      <Button
        title="Login with Facebook"
        onPress={() => {
    </View>
  )

}

export default fbLogin