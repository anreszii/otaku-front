import React, { useState, useRef, FC } from "react";
import { View, TextInput, StyleSheet, Alert } from "react-native";
import Button from "./Button";

interface CodeInputProps {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
}

const CodeInput: FC<CodeInputProps> = ({ code, setCode }) => {
  const codeInputs = Array(4).fill(0);
  const codeInputRefs = codeInputs.map(() => useRef<any>(null));

  const handleCodeChange = (index: any, value: any) => {
    setCode((prevCode) => {
      const newCode = prevCode.split("");
      newCode[index] = value;

      return newCode.join("");
    });

    if (value === "" && index > 0) {
      codeInputRefs[index - 1].current.focus();
    } else if (index < codeInputs.length - 1 && value !== "") {
      codeInputRefs[index + 1].current.focus();
    }
  };

  const handleCodeKeyPress = (index: any, event: any) => {
    if (event.nativeEvent.key === "Backspace" && index > 0) {
      codeInputRefs[index - 1].current.focus();
    } else if (
      index < codeInputs.length - 1 &&
      event.nativeEvent.key !== "Backspace"
    ) {
      codeInputRefs[index + 1].current.focus();
    }
  };

  const handleCodeInput = () => {
    Alert.alert("Введенный код:", code);
  };

  return (
    <View style={styles.container}>
      {codeInputs.map((_, index) => (
        <TextInput
          key={index}
          ref={codeInputRefs[index]}
          style={styles.codeInput}
          keyboardType="numeric"
          maxLength={1}
          onChangeText={(value) => handleCodeChange(index, value)}
          onKeyPress={(event) => handleCodeKeyPress(index, event)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  codeInput: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    margin: 5,
    textAlign: "center",
    fontSize: 18,
  },
  submitButtonContainer: {
    marginTop: 20,
  },
});

export default CodeInput;
