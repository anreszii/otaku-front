import { Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import Typography from "./typography";
import { TextInput } from "react-native-paper";
import { IField } from "..";

export const Field = ({
  styleInput = {},
  onPress,
  error,
  errorText,
  ...props
}: IField) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <Pressable style={[styles.inputView, styleInput]}>
      <TextInput
        autoCapitalize="none"
        underlineColor="transparent"
        activeUnderlineColor="transparent"
        underlineColorAndroid="transparent"
        textColor="#FFF"
        selectionColor="#FFF"
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        style={
          isFocus
            ? {
                borderWidth: 1,
                borderColor: "#4169E1",
                borderBottomRightRadius: 24,
                borderBottomLeftRadius: 24,
                backgroundColor: "rgba(65, 105, 225, 0.12)",
                color: "#fff",
                paddingLeft: 6,
                fontSize: 18,
              }
            : {
                borderWidth: 1,
                borderColor: "#CCCCCC",
                borderBottomRightRadius: 24,
                borderBottomLeftRadius: 24,
                backgroundColor: "transparent",
                color: "#fff",
                paddingLeft: 6,
                fontSize: 18,
              }
        }
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        theme={{
          roundness: 24,
          colors: {
            primary: "#fff",
            error: "#FF5A47",
            background: "#fff",
            text: "#fff",
          },
        }}
        onPressIn={onPress && onPress}
        error={error}
        {...props}
      />
      {error && errorText && (
        <Typography variant="error">{errorText}</Typography>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  inputView: {
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
