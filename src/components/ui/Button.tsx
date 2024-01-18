import React from "react";
import {
  StyleSheet,
  TextStyle,
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
  styleText?: TextStyle;
  gradient?: boolean;
  whiteBorder?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  style,
  styleText,
  gradient = true,
  whiteBorder = false,
}) => {
  const GradientBtn = () => (
    <LinearGradient
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={["#7210FF", "#9D59FF"]}
      style={styles.container}
    >
      <Typography type="bold" style={{ ...styles.buttonTitle, ...styleText }}>
        {title}
      </Typography>
    </LinearGradient>
  );

  const OutlinedButton = () => (
    <View style={styles.container}>
      <Typography
        type="bold"
        style={{ ...styles.buttonTitleOut, ...styleText }}
      >
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
          : whiteBorder
          ? { ...styles.outlinedWhiteButton, ...style }
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
  buttonTitleOut: {
    color: "#7210FF",
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
    borderRadius: 25,
    width: "100%",
    height: 58,
    borderColor: "#7210FF",
    borderWidth: 2,
  },
  outlinedWhiteButton: {
    borderRadius: 25,
    width: "100%",
    height: 58,
    borderColor: "#FFF",
    borderWidth: 2,
  },
});

export default Button;
