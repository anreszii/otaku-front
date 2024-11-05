import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Field, Typography } from "ui";
import Animated, { SlideInRight, SlideOutLeft } from "react-native-reanimated";
import { ErrorMessage } from "../ErrorMessage";

interface CodeStepProps {
  code: string[];
  error: string;
  isLoading: boolean;
  inputRefs: React.RefObject<any>[];
  onCodeChange: (index: number, text: string) => void;
  onKeyPress: (index: number, key: string) => void;
  onSubmit: (newCode: string[]) => void;
}

export const CodeStep = ({
  code,
  error,
  isLoading,
  inputRefs,
  onCodeChange,
  onKeyPress,
  onSubmit,
}: CodeStepProps) => (
  <Animated.View
    entering={SlideInRight.duration(300)}
    exiting={SlideOutLeft.duration(300)}
  >
    <Typography fontFamily="Montserrat" style={styles.subtitle}>
      Код отправлен на вашу почту, введите его ниже
    </Typography>
    <View style={styles.code}>
      {Array.from({ length: 4 }).map((_, index) => (
        <Field
          key={index}
          ref={inputRefs[index]}
          placeholder={`${index + 1}`}
          value={code[index]}
          onChangeText={(text) => onCodeChange(index, text)}
          onKeyPress={({ nativeEvent: { key } }) => onKeyPress(index, key)}
          maxLength={1}
          keyboardType="numeric"
          style={styles.field}
          textInputStyle={styles.fieldInput}
        />
      ))}
    </View>
    {error && <ErrorMessage error={error} />}
    <Button
      variant="contain"
      title="Продолжить"
      onPress={() => onSubmit(code)}
      isLoading={isLoading}
    />
  </Animated.View>
);

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  code: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    marginVertical: 25,
  },
  field: {
    width: 60,
    paddingHorizontal: 0,
  },
  fieldInput: {
    textAlign: "center",
  },
});
