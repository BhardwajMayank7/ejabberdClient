import React, { useState, useEffect } from "react";
import { View, Animated, Dimensions } from "react-native";
import Heart from "./Heart";
import { styles } from "../../styles";

const { height, width } = Dimensions.get("window");

const FloatingHearts = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      const animatedValue = new Animated.Value(0);

      setHearts((hearts) => [
        ...hearts,
        {
          id,
          animatedValue,
        },
      ]);

      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,
      }).start(() => {
        setHearts((hearts) => hearts.filter((heart) => heart.id !== id));
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.heartContainer}>
      {hearts.map((heart) => {
        const translateY = heart.animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [height, 0],
        });
        const opacity = heart.animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0],
        });

        return (
          <Heart
            key={heart.id}
            style={{
              transform: [{ translateY }],
              opacity,
              left: Math.random() * width,
            }}
          />
        );
      })}
    </View>
  );
};

export default FloatingHearts;
