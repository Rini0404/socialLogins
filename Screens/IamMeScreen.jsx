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

  const navigation = useNavigation();

  const { params } = props.route;

  const [isHere, setIsHere] = React.useState(false);

  React.useEffect(() => {
    if (params) {
      setIsHere(true);
    }
  }, [params]);

  return (
    <View style={styles.container}>
      <View style={styles.textOverall}>
        {isHere ? (
          <>
            <Text style={styles.textWelcome}>Welcome</Text>
            <Image style={styles.userImage} source={{ uri: params.picture }} />
            <Text style={styles.textName}>{params.name}</Text>
            <Text style={styles.textEmail}>{params.email}</Text>
            <Text style={styles.subtext}>
              Whether you have been in business 20 years or you have a business
              idea, we are here to help. We can help you from your logo, get
              visual content on your site and help you make decisions for you
              company and your budget.
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.text}>LOADING...</Text>
            <Text style={styles.subtext}>LOADING...</Text>
          </>
        )}
      </View>
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
    backgroundColor: "black",
  },
  image: {
    flex: 1,
  },
  textWelcome: {
    color: "#D5D5D5",
    fontSize: 28,
    top: -300,
    lineHeight: 84,
    textAlign: "center",
  },
  textName: {
    color: "#C0FF6B",
    fontSize: 28,
    top: -300,
    lineHeight: 50,
    textAlign: "center",
  },
  textEmail: {
    color: "#D5D5D5",
    fontSize: 20,
    top: -300,
    lineHeight: 20,
    textAlign: "center",
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
    fontSize: 20,
    top: -250,
    lineHeight: 24,
    fontWeight: "bold",
    textAlign: "left",
    paddingHorizontal: 50,
    // fontFamily: "KFont"
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
