import { View, Text, StyleSheet } from "react-native";
import { FC } from "react";
import { ITypography } from "@/types/ui";

const Typography: FC<ITypography> = ({ children, ...props }) => {
  return (
    <Text style={styles.text} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "UrbanistBold",
  },
});

export default Typography;
