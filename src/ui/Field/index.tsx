import React, { useState } from "react";
import { TextInput, StyleSheet } from "react-native";
import { TextInputProps } from "react-native";
import { Typography } from "ui";

interface FieldProps extends TextInputProps {
  errorText?: string;
}

const Field: React.FC<FieldProps> = ({ style, errorText, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      <TextInput
        style={[
          styles.input,
          isFocused && styles.inputFocused,
          ...(Array.isArray(style) ? style : [style]),
        ]}
        autoCapitalize="none"
        underlineColorAndroid="transparent"
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      {errorText && (
        <Typography fontFamily="Urbanist" style={styles.errorText}>
          {errorText}
        </Typography>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    fontSize: 18,
    fontFamily: "Urbanist",
    color: "#fff",
  },
  inputFocused: {
    borderColor: "#4169E1",
    backgroundColor: "rgba(65, 105, 225, 0.12)",
  },
  errorText: {
    marginTop: 5,
    color: "#FF3333",
    marginBottom: -10,
    fontSize: 16,
    fontWeight: "500",
  },
});

export default Field;
