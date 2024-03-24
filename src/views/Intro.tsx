import { IIntro } from "@/interfaces/Intro";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet } from "react-native";

const Intro: React.FC<IIntro> = ({ setIsAppReady }) => {
  const firstLetterAnim = useRef(new Animated.Value(-250)).current;
  const secondLetterAnim = useRef(new Animated.Value(250)).current;
  const lettersAnim = useRef(new Animated.Value(1)).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(firstLetterAnim, {
        toValue: 0,
        duration: 1400,
        easing: Easing.inOut(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(secondLetterAnim, {
        toValue: 0,
        duration: 1400,
        easing: Easing.inOut(Easing.exp),
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(lettersAnim, {
            toValue: 10,
            duration: 900,
            easing: Easing.inOut(Easing.exp),
            useNativeDriver: true,
          }),
          Animated.timing(screenOpacity, {
            toValue: 0,
            duration: 900,
            easing: Easing.inOut(Easing.exp),
            useNativeDriver: true,
          }),
        ]).start(() => setIsAppReady(true));
      }, 150);
    });
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale: lettersAnim }],
          opacity: screenOpacity,
        },
      ]}
    >
      <Animated.Image
        source={require("assets/a.png")}
        style={[
          styles.letter,
          {
            transform: [{ translateX: firstLetterAnim }],
          },
        ]}
        resizeMode="contain"
      />
      <Animated.Image
        source={require("assets/u.png")}
        style={[
          styles.letter,
          {
            transform: [{ translateX: secondLetterAnim }],
          },
        ]}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0B1218",
  },
  letter: {
    position: "absolute",
    width: 200,
    height: 125,
  },
});

export default Intro;
