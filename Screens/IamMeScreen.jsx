import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
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

function IamMeScreen(props) {
  const image = require("../assets/dust.png");

  const navigation = useNavigation()

  const { params } = props.route

  const [ isHere, setIsHere ] = React.useState(false)

  React.useEffect(() => {
    
    if (params) {
      setIsHere(true)
    }
     
  }, [params])


  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.textOverall}>
          
          { isHere ? (
              <>
                <Image
                  style={styles.userImage}
                  source={{ uri: params.picture }}
                />
                <Text style={styles.text}>
                  Hello{"\n"} 
                  {params.name}!{"\n"}
                  Welcome to Devusol
                  </Text>
                <Text style={styles.subtext}>{params.email}</Text>
              </>
            
          
            ) : (
              <>
              <Text style={styles.text}>LOADING...</Text>
              <Text style={styles.subtext}>LOADING...</Text>
              </>  
            )
          }

        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  userImage: {
    // center the image
    alignSelf: "center",
    // set the width and height
    width: 200,
    height: 200,
    // set the border radius
    borderRadius: 100,
    top: -300,

  },
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  text: {
    color: "white",
    fontSize: 50,
    top: -300,
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
    top: -250,
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

export default IamMeScreen;