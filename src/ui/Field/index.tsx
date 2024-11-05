import React, { forwardRef, useState } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  StyleProp,
  TextStyle,
} from "react-native";
import { TextInputProps } from "react-native";
import Typography from "../Typography";
import { Ionicons } from "@expo/vector-icons";

interface FieldProps extends TextInputProps {
  errorText?: string;
  isPassword?: boolean;
  textInputStyle?: StyleProp<TextStyle>;
  errorTextStyle?: StyleProp<TextStyle>;
}

const Field = forwardRef<TextInput, FieldProps>(
  (
    { style, errorText, isPassword, textInputStyle, errorTextStyle, ...props },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
      <>
        <View
          style={[
            styles.inputContainer,
            ...(Array.isArray(style) ? style : [style]),
          ]}
        >
          <TextInput
            ref={ref}
            style={[
              styles.input,
              isFocused && styles.inputFocused,
              { paddingRight: isPassword ? 50 : 20 },
              ...(Array.isArray(textInputStyle)
                ? textInputStyle
                : [textInputStyle]),
            ]}
            secureTextEntry={isPassword && !isPasswordVisible}
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          {isPassword && (
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              <Ionicons
                name={isPasswordVisible ? "eye-off" : "eye"}
                size={24}
                color="rgba(255, 255, 255, 0.5)"
              />
            </TouchableOpacity>
          )}
        </View>
        {errorText && (
          <Typography
            fontFamily="Urbanist"
            style={[
              styles.errorText,
              ...(Array.isArray(errorTextStyle)
                ? errorTextStyle
                : [errorTextStyle]),
            ]}
          >
            {errorText}
          </Typography>
        )}
      </>
    );
  }
);

const styles = StyleSheet.create({
  inputContainer: {
    position: "relative",
    width: "100%",
  },
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
  iconContainer: {
    position: "absolute",
    right: 15,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputFocused: {
    borderColor: "#4169E1",
    backgroundColor: "rgba(65, 105, 225, 0.12)",
  },
  errorText: {
    marginTop: 15,
    color: "#FF3333",
    marginBottom: -12.5,
    fontSize: 16,
    fontWeight: "500",
  },
});

export default Field;
