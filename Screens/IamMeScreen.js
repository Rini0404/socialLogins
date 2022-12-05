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

function IamMeScreen() {
  const image = require("../assets/dust.png");

  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.textOverall}>
          <Text style={styles.text}>Image</Text>
          <Text style={styles.subtext}>Name</Text>
          <Text style={styles.subtext}>Email</Text>
   


        </View>
      </ImageBackground>
    </View>
  );
}

export default IamMeScreen;

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
