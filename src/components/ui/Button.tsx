import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Typography from "./Typography";

export default function Button({ onPress, title, style }: any) {
  const GradientBtn = () => (
    <LinearGradient
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={["#7210FF", "#9D59FF"]}
      style={styles.gradient}
    >
      <Typography type="button" style={styles.buttonTitle}>
        {title}
      </Typography>
    </LinearGradient>
  );

  return (
    <TouchableOpacity onPress={onPress} style={{ ...styles.button, ...style }}>
      <GradientBtn />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FFF",
    width: "80%",
    height: 58,
    borderRadius: 25,
  },
  buttonTitle: {
    color: "#FFF",
    fontWeight: "bold",
    lineHeight: 22.4,
    letterSpacing: 0.2,
    fontSize: 16,
  },
  gradient: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    height: "100%",
  },
});
