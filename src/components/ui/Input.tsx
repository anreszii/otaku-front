import React, { useState } from "react";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";
import { TextInput } from "react-native-paper";
import Typography from "./Typography";
import { controlsStyle } from "../../style/controls";
import TypographyError from "./TypographyError";

interface InputProps {
  label?: string;
  styleInput?: Record<string, any>;
  onPress?: () => void;
  error?: boolean;
  errorText?: any;
  [key: string]: any;
}

const Input: React.FC<InputProps> = ({
  label,
  styleInput,
  onPress,
  error,
  errorText,
  ...props
}) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <Pressable style={[styleInput, styles.inputView]}>
      <Typography type="button" style={styles.label}>
        {label}
      </Typography>
      <TextInput
        autoCapitalize="none"
        underlineColor="transparent"
        activeUnderlineColor="transparent"
        underlineColorAndroid="transparent"
        style={
          isFocus
            ? {
                borderWidth: 1,
                borderColor: "#7210FF",
                borderBottomRightRadius: 16,
                borderBottomLeftRadius: 16,
              }
            : {
                borderWidth: 1,
                borderColor: "transparent",
                borderBottomRightRadius: 16,
                borderBottomLeftRadius: 16,
                backgroundColor: "#F5F5F5",
              }
        }
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        theme={{
          ...controlsStyle.inputOutlinedTheme,
          colors: {
            ...controlsStyle.inputOutlinedTheme.colors,
          },
        }}
        onPressIn={onPress && onPress}
        error={error}
        {...props}
      />
      {error && errorText && <TypographyError error={errorText} />}
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
