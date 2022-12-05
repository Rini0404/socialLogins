import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useAuthRequest, makeRedirectUri } from "expo-auth-session";
import React, { useState } from 'react';
import Constants from "expo-constants";

// web 
// 421702174775-q1jbge72aku0h13g0lglh6gbari6s49f.apps.googleusercontent.com

// ios
// 421702174775-d0a8ck7opgl6g62c52fdvlgf18qtkpks.apps.googleusercontent.com

// android
// 421702174775-3249vun33bp0038bdh9e10h857phbhm3.apps.googleusercontent.com


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

WebBrowser.maybeCompleteAuthSession();


export default function App() {
  
  const [authRequest, authResponse, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID,
      usePKCE: false,
      scopes: ["openid", "profile", "email"],
      redirectUri: REDIRECT_URI,
      extraParams: {
        // On Android it will just skip right past sign in otherwise
        show_dialog: "true",
      },
    },
    discovery
  );
  
  const [ codeToken, setCodeToken ] = useState(null)

  React.useEffect(() => {
    if (authResponse) {
      if (authResponse.error) {
        alert(`Error: ${authResponse.error_description}`);
        return;
      }

      if (authResponse.type === "success") {
        const { code } = authResponse.params;
        console.log(code);
        setCodeToken(code)

      }
    }
  }, [authResponse]);







  return (
    <View style={styles.container}>
      <Button title="Login with Google" 
      onPress={() => {
        promptAsync({ useProxy: USE_PROXY })
      }} />
    
        {
          codeToken ? <Text
          style={{color: 'white', fontSize: 20}}   
        
          >{codeToken}</Text> : 
          <Text
          style={{color: 'white', fontSize: 20}}
          >Sigin in plz </Text>

        }

    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

});
