import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";
import { controlsStyle } from "../../style/controls";
import Typography from "./Typography";

export default function Input({ label, styleInput, ...props }: any) {
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
}

const styles = StyleSheet.create({
  inputView: {
    maxWidth: "80%",
    width: "80%",
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 22.4,
    letterSpacing: 0.2,
    marginLeft: 16,
  },
});
