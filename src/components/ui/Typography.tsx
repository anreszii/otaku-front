import { StyleSheet, Text, TextStyle } from "react-native";
import React, { FC } from "react";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";

interface TypographyProps {
  children: React.ReactNode;
  style?: TextStyle;
  type?: string;
  gradient?: boolean;
}

const Typography: FC<TypographyProps> = ({
  children,
  style,
  type,
  gradient,
}: any) => {
  const GradientText = (props: any) => {
    return (
      <MaskedView maskElement={<Text {...props} />}>
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={["#7210FF", "#9D59FF"]}
        >
          <Text {...props} style={[props.style, { opacity: 0 }]} />
        </LinearGradient>
      </MaskedView>
    );
  };

  if (gradient) {
    if (type === "title") {
      return (
        <GradientText style={{ ...styles.textTitle, ...style }}>
          {children}
        </GradientText>
      );
    } else if (type === "regular") {
      return (
        <GradientText style={{ ...styles.textRegular, ...style }}>
          {children}
        </GradientText>
      );
    } else if (type === "bold") {
      return (
        <GradientText style={{ ...styles.textBold, ...style }}>
          {children}
        </GradientText>
      );
    } else if (type === "semibold") {
      return (
        <GradientText style={{ ...styles.textSemiBold, ...style }}>
          {children}
        </GradientText>
      );
    } else if (type === "medium") {
      return (
        <GradientText style={{ ...styles.textMedium, ...style }}>
          {children}
        </GradientText>
      );
    }
  } else {
    if (type === "title") {
      return <Text style={{ ...styles.textTitle, ...style }}>{children}</Text>;
    } else if (type === "regular") {
      return (
        <Text style={{ ...styles.textRegular, ...style }}>{children}</Text>
      );
    } else if (type === "bold") {
      return <Text style={{ ...styles.textBold, ...style }}>{children}</Text>;
    } else if (type === "semibold") {
      return (
        <Text style={{ ...styles.textSemiBold, ...style }}>{children}</Text>
      );
    } else if (type === "medium") {
      return <Text style={{ ...styles.textMedium, ...style }}>{children}</Text>;
    }
  }
};

const styles = StyleSheet.create({
  textTitle: {
    fontFamily: "NeueHaasDisplay",
  },
  textRegular: {
    fontFamily: "UrbanistRegular",
  },
  textBold: {
    fontFamily: "UrbanistBold",
  },
  textSemiBold: {
    fontFamily: "UrbanistSemiBold",
  },
  textMedium: {
    fontFamily: "UrbanistMedium",
  },
});

export default Typography;
