import { View, Text, ScrollView, ScrollViewProps } from "react-native";
import React from "react";

interface Props extends ScrollViewProps {}

export const Section = ({ children, style, ...props }: Props) => {
  return (
    <ScrollView style={[style, { flex: 1 }]} {...props}>
      {children}
    </ScrollView>
  );
};
