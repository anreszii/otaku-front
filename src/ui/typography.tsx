import { Text, StyleSheet, TextProps } from "react-native";
import { Component, FC } from "react";

export interface ITypography extends TextProps {
  variant:
    | "sub-regular"
    | "sub-medium"
    | "sub-semi-bold"
    | "sub-bold"
    | "title-regular"
    | "title-medium"
    | "title-semi-bold"
    | "title-bold"
    | "error";
}

const Typography: FC<ITypography> = ({
  children,
  style,
  variant,
  ...props
}) => {
  switch (variant) {
    case "sub-regular":
      return (
        <Text style={[style, styles.subRegular]} {...props}>
          {children}
        </Text>
      );
    case "sub-medium":
      return (
        <Text style={[style, styles.subMedium]} {...props}>
          {children}
        </Text>
      );
    case "sub-semi-bold":
      return (
        <Text style={[style, styles.subSemiBold]} {...props}>
          {children}
        </Text>
      );
    case "sub-bold":
      return (
        <Text style={[style, styles.subBold]} {...props}>
          {children}
        </Text>
      );
    case "title-regular":
      return (
        <Text style={[style, styles.titleRegular]} {...props}>
          {children}
        </Text>
      );
    case "title-medium":
      return (
        <Text style={[style, styles.titleMedium]} {...props}>
          {children}
        </Text>
      );
    case "title-semi-bold":
      return (
        <Text style={[style, styles.titleSemiBold]} {...props}>
          {children}
        </Text>
      );
    case "title-bold":
      return (
        <Text style={[style, styles.titleBold]} {...props}>
          {children}
        </Text>
      );
    case "error":
      return (
        <Text style={[style, styles.error]} {...props}>
          {children}
        </Text>
      );
  }
};

export class TypographyComponent extends Component {
  constructor(props: ITypography) {
    super(props);
  }
  render() {
    return <Typography {...this.props} variant="sub-bold" />;
  }
}

const styles = StyleSheet.create({
  subRegular: {
    fontFamily: "UrbanistRegular",
  },
  subMedium: {
    fontFamily: "UrbanistMedium",
  },
  subSemiBold: {
    fontFamily: "UrbanistSemiBold",
  },
  subBold: {
    fontFamily: "UrbanistBold",
  },
  titleRegular: {
    fontFamily: "NotoSansJPRegular",
  },
  titleMedium: {
    fontFamily: "NotoSansJPMedium",
  },
  titleSemiBold: {
    fontFamily: "NotoSansJPSemiBold",
  },
  titleBold: {
    fontFamily: "NotoSansJPBold",
  },
  error: {
    fontFamily: "UrbanistMedium",
  },
});

export default Typography;
