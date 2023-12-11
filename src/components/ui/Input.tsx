import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import Typography from "./Typography";
import { controlsStyle } from "../../style/controls";

interface InputProps {
  label?: string;
  styleInput?: Record<string, any>;
  [key: string]: any;
}

const Input: React.FC<InputProps> = ({ label, styleInput, ...props }) => {
  return (
    <Pressable style={[styleInput, styles.inputView]}>
      <Typography type="button" style={styles.label}>
        {label}
      </Typography>
      <TextInput
        mode="outlined"
        error={false}
        autoCapitalize="none"
        theme={{
          ...controlsStyle.inputOutlinedTheme,
          colors: {
            ...controlsStyle.inputOutlinedTheme.colors,
          },
        }}
        {...props}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  inputView: {
    maxWidth: "100%",
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 22.4,
    letterSpacing: 0.2,
    marginLeft: 16,
  },
});

export default Input;
