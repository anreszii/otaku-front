import {
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";
import React, { FC } from "react";

interface RadioButtonProps extends TouchableOpacityProps {
  checked: boolean;
  style?: StyleProp<ViewStyle>;
}

const RadioButton: FC<RadioButtonProps> = ({
  checked,
  style = {},
  ...props
}) => {
  return (
    <TouchableOpacity style={[styles.container, style]} {...props}>
      {checked ? <View style={styles.content} /> : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#000",
  },
});

export default RadioButton;
