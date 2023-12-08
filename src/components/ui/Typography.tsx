import { StyleSheet, Text } from "react-native";
import React from "react";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";

export default function Typography({ children, style, type, gradient }: any) {
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
    if (type === "button") {
      return (
        <GradientText style={{ ...styles.textButton, ...style }}>
          {children}
        </GradientText>
      );
    } else if (type === "title") {
      return (
        <GradientText style={{ ...styles.textTitle, ...style }}>
          {children}
        </GradientText>
      );
    } else {
      return (
        <GradientText style={{ ...styles.textSub, ...style }}>
          {children}
        </GradientText>
      );
    }
  } else {
    if (type === "button") {
      return <Text style={{ ...styles.textButton, ...style }}>{children}</Text>;
    } else if (type === "title") {
      return <Text style={{ ...styles.textTitle, ...style }}>{children}</Text>;
    } else {
      return <Text style={{ ...styles.textSub, ...style }}>{children}</Text>;
    }
  }
}

const styles = StyleSheet.create({
  textButton: {
    fontFamily: "UrbanistBold",
  },
  textTitle: {
    fontFamily: "NeueHaasDisplay",
  },
  textSub: {
    fontFamily: "UrbanistRegular",
  },
});
