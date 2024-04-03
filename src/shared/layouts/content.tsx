import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ViewStyle,
  StyleProp,
  ViewProps,
} from "react-native";
import React, { PropsWithChildren } from "react";

interface Props extends PropsWithChildren<ViewProps> {}

export const Content = ({ children, style, ...props }: Props) => {
  return (
    <View style={[styles.content, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    width: Dimensions.get("screen").width - 48,
  },
});
