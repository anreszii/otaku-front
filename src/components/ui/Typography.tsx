import { View, Text, StyleSheet, TextProps } from "react-native";
import { Component, FC } from "react";
import { ITypography } from "@/types/ui";

const Typography: FC<ITypography> = ({ children, ...props }) => {
  return (
    <Text style={styles.text} {...props}>
      {children}
    </Text>
  );
};

export class TypographyComponent extends Component {
  constructor(props: TextProps) {
    super(props);
  }
  render() {
    return <Typography {...this.props} />;
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "UrbanistBold",
  },
});

export default Typography;
