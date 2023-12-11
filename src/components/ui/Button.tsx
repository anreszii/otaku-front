import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Typography from "./Typography";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  style?: ViewStyle;
  gradient?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  style,
  gradient = true,
}) => {
  const GradientBtn = () => (
    <LinearGradient
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={["#7210FF", "#9D59FF"]}
      style={styles.container}
    >
      <Typography type="button" style={styles.buttonTitle}>
        {title}
      </Typography>
    </LinearGradient>
  );

  const OutlinedButton = () => (
    <View style={styles.container}>
      <Typography type="button" style={styles.buttonTitle}>
        {title}
      </Typography>
    </View>
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      style={
        gradient
          ? { ...styles.button, ...style }
          : { ...styles.outlinedButton, ...style }
      }
    >
      {gradient ? <GradientBtn /> : <OutlinedButton />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FFF",
    width: "100%",
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
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    height: "100%",
  },
  outlinedButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    height: "100%",
    borderColor: "#FFF",
    borderWidth: 2,
  },
});

export default Button;
