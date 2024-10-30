import {
  Text,
  StyleSheet,
  TextProps,
  StyleProp,
  TextStyle,
} from "react-native";
import React, { Component, PropsWithChildren } from "react";
import MaskedView from "@react-native-masked-view/masked-view";
import LinearGradient from "react-native-linear-gradient";

interface TypographyProps extends TextProps {
  style?: StyleProp<TextStyle>;
  type?: "gradient" | "default";
  fontFamily?: "Montserrat" | "Urbanist";
}

const Typography: React.FC<PropsWithChildren<TypographyProps>> = ({
  children,
  style,
  type,
  fontFamily,
  ...props
}) => {
  const GradientText = (props: TypographyProps) => {
    return (
      <MaskedView maskElement={<Text {...props} />}>
        <LinearGradient
          colors={["#9540f5", "#FF00E8"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
        >
          <Text {...props} style={[props.style, { opacity: 0 }]} />
        </LinearGradient>
      </MaskedView>
    );
  };

  switch (type) {
    case "default":
      return (
        <Text style={[style, { fontFamily }]} {...props}>
          {children}
        </Text>
      );
    case "gradient":
      return (
        <GradientText style={[style, { fontFamily }]}>{children}</GradientText>
      );
    default:
      return (
        <Text style={[style, { fontFamily }]} {...props}>
          {children}
        </Text>
      );
  }
};

export class TypographyComponent extends Component {
  constructor(props: TypographyProps) {
    super(props);
  }
  render() {
    return <Typography {...this.props} />;
  }
}

export default Typography;
