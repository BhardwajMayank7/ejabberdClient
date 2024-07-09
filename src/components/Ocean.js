import React from "react";
import { ImageBackground, StyleSheet } from "react-native";

const Ocean = () => {
  return (
    <ImageBackground
      source={require("../../assets/ocean.png")}
      style={styles.background}
      imageStyle={styles.image}
    >
      {/* Ocean background content */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
});

export default Ocean;
