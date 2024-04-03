import { View, Text } from "react-native";
import React from "react";
import { SignInTitle } from "./components/sign-in-header";
import { SignInRow } from "./components/sign-in-row";

const SignInForm = () => {
  return (
    <View>
      <SignInTitle />
      <SignInRow />
    </View>
  );
};

export default SignInForm;
